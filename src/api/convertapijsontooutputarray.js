import { Token } from "./tokens"
import { STXPrice } from "./coinprices/stxprices" 
import { DIKOPrice } from "./coinprices/dikoprices" 
import { MIAPrice } from "./coinprices/miaprices" 
import { XBTCPrice } from "./coinprices/xbtcprices" 

export default async function convertJsonToOutputArray(json, walletId) {
//await utilityGetCoinFromCoinGecko('xBTC');
    let outputArray = [];
    for (const xactn of json) {
        if (xactn.tx.tx_status === "success") {
            outputArray = await addOutputArrayRowsForXactn(outputArray, xactn, walletId);
        }
    }
    outputArray = await populateRowId(outputArray);
    console.log(outputArray);
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
        inAmount: await formatAmount(inSymbol,inAmountRaw),
        outSymbol: outSymbol,
        outAmount: await formatAmount(outSymbol,outAmountRaw),
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

async function formatAmount(symbol,amount)
{
    let convertedAmount=amount;
    
    let matchingToken = Token?.tokens?.filter(function(token) {
        return (token.symbol === symbol)
    });

    if (matchingToken?.length > 0) {
        convertedAmount = amount / matchingToken[0].conversionFactor;
        convertedAmount = convertedAmount.toFixed(matchingToken[0].amountDecimals);
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
    let doubleColonLoc=symbol.indexOf('::');
    if (doubleColonLoc>-1) {
        symbol=symbol.substring(doubleColonLoc+2);
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
                return (new Date(item.date).getTime() <= new Date(priceDate).getTime());
            });
            //There should always be a matching record if the array of historical prices was created correctly
            if (matchingPrice.length>0) {
                price = matchingPrice[matchingPrice.length-1].price
                let decPrice=await formatPrice(price,symbol);
                //If we do not have a valid price in our historical array
                if (decPrice==0) {
                    //otherwise call CoinGeckoAPI
                    decPrice=await getPriceFromCoinGecko(symbol,priceDate);
                    price=await formatPrice(decPrice,symbol);
                } else {
                    price=decPrice;
                }
            }
        }
    }
    return price;
}

//As we add assets which have either historical prices or prices available from coingecko,
//js files should be created with the objects and price arrays and should be added here
//In theory this should be done with some sort of inheritance structure in future
async function getCoinPriceObject(symbol) {
    let coinPriceObject;
    if (symbol==='STX') {
        coinPriceObject=STXPrice.stxPrices;
    } else if (symbol==='DIKO') {
        coinPriceObject=DIKOPrice.dikoPrices;
    } else if (symbol==='MIA') {
        coinPriceObject=MIAPrice.miaPrices;
    } else if (symbol==='xBTC') {
        coinPriceObject=XBTCPrice.xbtcPrices;
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
        if (response.status === 200) {
            let json = await response.json();
            if (json.market_data !== undefined) {
                price=json.market_data.current_price.usd;
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
            apiSymbol = matchingToken[0].apiSymbol;
        } 
    }

    return apiSymbol;
}

async function getDateForCoinGecko(thisDate) {
    let workingDate=new Date(thisDate);
    let returnDate = workingDate.getUTCDate() + "-" + (parseInt(workingDate.getUTCMonth())+1) + "-" + workingDate.getUTCFullYear();
    return returnDate;
}

async function formatPrice(price,symbol) {
    let workingPrice='N/A';
    let decPrice=parseFloat(price);
    if (!Number.isNaN(decPrice)) {
        let matchingToken = Token?.tokens?.filter(function(token) {
            return (token.symbol === symbol);
        });
        if (matchingToken?.length > 0) {
            workingPrice =decPrice.toFixed(matchingToken[0].priceDecimals);
        } else {
             workingPrice=decPrice.toFixed(2); //default is 2
        }
    }
    return workingPrice;
}

async function populateRowId(outputArray) {
    let ctr = 1;
    for (const arrayRow of outputArray) {
        arrayRow.rowId = ctr;
        ctr += 1;
    }
    return outputArray;
}

async function utilityGetCoinFromCoinGecko(coin) {
    var now = new Date(2021, 11, 29);
    for (var thisDate = new Date(2021, 11, 20); thisDate <= now; thisDate.setDate(thisDate.getDate() + 1)) {
        let price=await getPriceFromCoinGecko(coin,thisDate.toISOString())
        console.log("{ date: '" + thisDate.toISOString() + "', coin: '" + coin + "', price: '" + price + "'},");

    }
}