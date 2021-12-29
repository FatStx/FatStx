import { Token } from "./tokens"
import { STXPrice } from "./stxprices" 

export default async function convertJsonToOutputArray(json, walletId) {
    let outputArray = [];
    for (const xactn of json) {
        if (xactn.tx.tx_status === "success") {
            outputArray = await addOutputArrayRowsForXactn(outputArray, xactn, walletId);
        }
    }
    outputArray = await populateRowId(outputArray);
    return outputArray;
}

async function addOutputArrayRowsForXactn(outputArray, xactn, walletId) {
    let outputRowRawData = await getOutputRowsForXactn(xactn, walletId);
    //console.log(xactn);
    for (var ctr = 0; ctr < outputRowRawData.rowCount; ctr += 1) {
        let outputRow = await getOutputArrayRow(
            xactn,
            ctr === 0 ? outputRowRawData.xactnFee : 0,
            outputRowRawData.transfersIn[ctr],
            outputRowRawData.transfersOut[ctr]
        );
        outputArray.push(outputRow);
    }

    return outputArray;
}

async function getOutputRowsForXactn(xactn, walletId) {
    //TODO: NFTs IN and OUT

    //XACTN FEE 
    let xactnFee = xactn.tx.sender_address === walletId ? xactn.tx.fee_rate : 0;
    let feeCtr = xactnFee > 0 ? 1 : 0;

    //IN
    let stxTransfersIn = await getSTXTransfersForXactn(xactn, walletId, true);
    let ftTransfersIn = await getFtCoinTransfersForXactn(xactn, walletId, true);
    let inCtr = stxTransfersIn.length + ftTransfersIn.length;

    //OUT
    let stxTransfersOut = await getSTXTransfersForXactn(xactn, walletId, false);
    let ftTransfersOut = await getFtCoinTransfersForXactn(xactn, walletId, false);
    let outCtr = stxTransfersOut.length + ftTransfersOut.length;

    let rowCount = Math.max(feeCtr, inCtr, outCtr);
    return {
        rowCount: rowCount,
        xactnFee: xactnFee,
        transfersIn: stxTransfersIn.concat(ftTransfersIn),
        transfersOut: stxTransfersOut.concat(ftTransfersOut)
    };
}

async function getFtCoinTransfersForXactn(xactn, walletId, isIncoming) {
    //Exclude WSTX and only look at transactions for the passed direction
    //NOTE that there *might* be times we have to not exclude WSTX in the future
    let ftTransfers = xactn.ft_transfers.filter(function(item) {

        return (item.asset_identifier !== 'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.wrapped-stx-token::wstx' &&
            item.recipient === (isIncoming ? walletId : item.recipient) &&
            item.sender === (isIncoming ? item.sender : walletId)
        );
    });
    return ftTransfers;
}

async function getSTXTransfersForXactn(xactn, walletId, isIncoming) {
    let ftTransfers = xactn.stx_transfers.filter(function(item) {
        return (item.recipient === (isIncoming ? walletId : item.recipient) &&
            item.sender === (isIncoming ? item.sender : walletId)
        );
    });
    return ftTransfers;
}

async function getOutputArrayRow(xactn, xactnFee, transferIn, transferOut) {
    let outputArrayRow = null;
    let inSymbol = await getTransferSymbol(transferIn);
    let outSymbol = await getTransferSymbol(transferOut);
    let inAmountRaw = transferIn === undefined ? 0 : transferIn.amount;
    let outAmountRaw = transferOut === undefined ? 0 : transferOut.amount;

    outputArrayRow = {
        burnDate: xactn.tx.burn_block_time_iso,
        rowId: 0,
        inSymbol: inSymbol,
        inAmount: await convertAmount(outSymbol,inAmountRaw),
        outSymbol: outSymbol,
        outAmount: await convertAmount(outSymbol,outAmountRaw),
        xactnFee: xactnFee / 1000000,
        inCoinPrice: await getCoinPrice(inSymbol,xactn.tx.burn_block_time_iso),
        outCoinPrice: await getCoinPrice(outSymbol,xactn.tx.burn_block_time_iso),
        xactnFeeCoinPrice: await getCoinPrice(xactnFee>0?'STX':'',xactn.tx.burn_block_time_iso),
        xactnType: 'TBD',
        xactnId: xactn.tx.tx_id,
        inAmountRaw: inAmountRaw,
        outAmountRaw: outAmountRaw,
        xactnFeeRaw: xactnFee,
    };
    return outputArrayRow;
}

async function convertAmount(symbol,amount,assetIdentifier)
{
    let convertedAmount=amount;
    if (symbol==='STX') {
        convertedAmount=amount/1000000;
    } else {
        let matchingToken = Token?.tokens?.filter(function(token) {
            return (token.symbol === symbol)
        });
        if (matchingToken?.length > 0) {
            convertedAmount = amount / matchingToken[0].conversionFactor;
        }
    }
    return convertedAmount;
}

async function getTransferSymbol(transferRow) {
    let symbol = '';
    if (transferRow !== undefined) {
        if (transferRow.asset_identifier !== undefined) {
            let matchingToken = Token?.tokens?.filter(function(token) {
                return (token.contract === transferRow.asset_identifier)
            });
            if (matchingToken?.length > 0) {
                symbol = matchingToken[0].symbol;
            } else {
                symbol = transferRow.asset_identifier;
            }
        } else {
            symbol = 'STX';
        }
    }
    return symbol;
}

async function getCoinPrice(symbol, priceDate) {
    let price = '';

    if (symbol !=='') {
        price = 'N/A';
        //Obtain the Object Array with prices for the symbol, if one exists
        let coinPriceObject=await getCoinPriceObject(symbol);
        if (coinPriceObject!==undefined) {
        let matchingPrice = coinPriceObject.filter(function(item) {
            return (new Date(item.date).getTime() >= new Date(priceDate).getTime());
        });
        //If a match in historical prices, use that price
        if (matchingPrice.length>0) {
            price = matchingPrice[0].price
            let intPrice=parseInt(price)
            if (!Number.isNaN(intPrice)) {
                price=intPrice.toFixed(2);
            }
        } else {
            //otherwise call CoinGeckoAPI
            price=await getPriceFromCoinGecko(symbol,priceDate);
        }
    }
}

    return price;
}

async function getCoinPriceObject(symbol) {
    let coinPriceObject;
    if (symbol==='STX') {
        coinPriceObject=STXPrice.stxPrices;
    }
    
    return coinPriceObject;
}

async function getPriceFromCoinGecko(symbol, priceDate) {
    let price='N/A';
    const baseUrl = 'https://api.coingecko.com/api/v3/coins/';
    let apiSymbol=await getCoinPriceAPISymbol(symbol);
    if (apiSymbol !=='')
    {
        let dateForCG = await getDateForCoinGecko(new Date(priceDate))
        let url=baseUrl+apiSymbol+'/history?localization=false&date=' + dateForCG;
        let response = await fetch(url);
        let json = null;
        if (response.status === 200) {
            json = await response.json();
            let intPrice=parseInt(json.market_data.current_price.usd);
            if (!Number.isNaN(intPrice)) {
                price=intPrice.toFixed(2);
            }
        }
    }
    return price;
}

async function getCoinPriceAPISymbol(symbol) {
    let apiSymbol='';
    if (symbol==='STX'){
        apiSymbol='blockstack';
    } else {
        let matchingToken = Token?.tokens?.filter(function(token) {
            return (token.symbol === symbol);
        });
        if (matchingToken?.length > 0) {
            apiSymbol = matchingToken[0].symbol;
        } 
    }

    return apiSymbol;
}

async function getDateForCoinGecko(thisDate) {
    let returnDate = ("0" + thisDate.getDate()).slice(-2) + "-" + ("0" + (thisDate.getMonth() + 1)).slice(-2) + "-" + thisDate.getFullYear();
    return returnDate;
}

async function populateRowId(outputArray) {
    let ctr = 1;
    for (const arrayRow of outputArray) {
        arrayRow.rowId = ctr;
        ctr += 1;
    }
    return outputArray;
}


//**************Just used by us to get coin history data, not real time.
// async function utilityGetCoinFromCoinGecko(coin, priceDate) {
//     const baseUrl = "https://api.coingecko.com/api/v3/coins/blockstack/history?localization=false&date=";
//     var now = new Date(2021, 11, 29);
//     var daysOfYear = [];
//     for (var thisDate = new Date(2021, 11, 22); thisDate <= now; thisDate.setDate(thisDate.getDate() + 1)) {
//         var dateForCG = await getDateForCoinGecko(thisDate)
//         let url = baseUrl + dateForCG;
//         let response = await fetch(url);
//         let json = null;
//         if (response.status === 200) {
//             json = await response.json();
//             console.log("{ date: '" + thisDate.toISOString() + "', coin: 'STX', price: '" + json.market_data.current_price.usd + "'},");
//         }
//     }
//     //return [response.status,json];
// }