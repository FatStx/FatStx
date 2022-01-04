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
    //XACTN FEE 
    let xactnFee = xactn.tx.sender_address === walletId ? xactn.tx.fee_rate : 0;
    let feeCtr = xactnFee > 0 ? 1 : 0;

    //IN
    let stxTransfersIn = await getAssetTransfersForXactn(xactn, walletId,'STX', true);
    let ftTransfersIn = await getAssetTransfersForXactn(xactn, walletId,'FT', true);
    let nftTransfersIn = await getAssetTransfersForXactn(xactn, walletId,'NFT', true);

    //OUT
    let stxTransfersOut = await getAssetTransfersForXactn(xactn, walletId, 'STX',false);
    let ftTransfersOut = await getAssetTransfersForXactn(xactn, walletId,'FT', false);
    let nftTransfersOut = await getAssetTransfersForXactn(xactn, walletId,'NFT', false);

    //Convert to simple header with symbol and amount, including summing by symbol if the other side is an NFT
    let stxHeadersIn = await convertTransfersToRowHeader(nftTransfersOut.length>0, stxTransfersIn);
    let ftHeadersIn = await convertTransfersToRowHeader(nftTransfersOut.length>0, ftTransfersIn);
    let nftHeadersIn = await convertTransfersToRowHeader(false,nftTransfersIn);
    let stxHeadersOut = await convertTransfersToRowHeader(nftTransfersIn.length>0,stxTransfersOut);
    let ftHeadersOut = await convertTransfersToRowHeader(nftTransfersIn.length>0,ftTransfersOut);
    let nftHeadersOut = await convertTransfersToRowHeader(false,nftTransfersOut);

    let inCtr = stxHeadersIn.length + ftHeadersIn.length + nftHeadersIn.length;
    let outCtr = stxHeadersOut.length + ftHeadersOut.length + nftHeadersOut.length;

    let rowCount = Math.max(feeCtr, inCtr, outCtr);
    return {
        rowCount: rowCount,
        xactnFee: xactnFee,
        transfersIn: stxHeadersIn.concat(ftHeadersIn).concat(nftHeadersIn),
        transfersOut: stxHeadersOut.concat(ftHeadersOut).concat(nftHeadersOut)
    };
}

//If an NFT IN, combine any stx or ft transfers out into a single row per coin
async function convertTransfersToRowHeader(isConcat,transferRows) {
    let rowHeaders = [];
    //initial pass through to narrow it down to symbol and amount
    for (const transferRow of transferRows) {
        let symbol = await getTransferSymbol(transferRow);
        rowHeaders.push({
            symbol: symbol,
            rawAmount: transferRow.amount
        })
    }
    if (isConcat) {
        let adjustedHeaders = [];
        let symbol='';
        let newRow;
        for (const transferRow of rowHeaders.sort((a, b) => a.symbol.localeCompare(b.symbol))){
            if (transferRow.symbol !== symbol) {
                symbol=transferRow.symbol;
                if (newRow !== undefined)
                {
                    adjustedHeaders.push(newRow);
                }
                newRow = {
                    symbol: symbol,
                    rawAmount: transferRow.rawAmount
                };
            } else {
                newRow = {
                    symbol: transferRow.symbol,
                    rawAmount: parseFloat(newRow.rawAmount) + parseFloat(transferRow.rawAmount)
                };
            }
        }
        if (newRow !== undefined)
        {
            adjustedHeaders.push(newRow);
        }
        return adjustedHeaders;
    }
    return rowHeaders;
}

async function getAssetTransfersForXactn(xactn, walletId, assetType, isIncoming) {

    let transferList = 
        assetType==='FT'
        ? xactn.ft_transfers
        : (assetType==='NFT'
            ? xactn.nft_transfers
            : xactn.stx_transfers );

    //Exclude WSTX and only look at transactions for the passed direction
    //NOTE that there *might* be times we have to not exclude WSTX in the future
    let assetTransfers = transferList.filter(function(item) {
        return (item.asset_identifier !== 'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.wrapped-stx-token::wstx' &&
        item.recipient === (isIncoming ? walletId : item.recipient) &&
        item.sender === (isIncoming ? item.sender : walletId)
        );
    });

    return assetTransfers;
}


async function getOutputArrayRow(xactn, xactnFee, transferIn, transferOut) {
    let outputArrayRow = null;
    let inSymbol = transferIn === undefined ? '' : (transferIn.symbol === undefined?'':transferIn.symbol);
    let outSymbol = transferOut === undefined ? '' : (transferOut.symbol === undefined?'':transferOut.symbol);
    let inAmountRaw = transferIn === undefined ? 0 : (transferIn.rawAmount === undefined?1:transferIn.rawAmount);
    let outAmountRaw = transferOut === undefined ? 0 : (transferOut.rawAmount === undefined?1:transferOut.rawAmount);

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
        xactnType: 'Unknown',
        xactnId: xactn.tx.tx_id,
        inAmountRaw: inAmountRaw,
        outAmountRaw: outAmountRaw,
        xactnFeeRaw: xactnFee,
    };
    outputArrayRow.xactnType = await getXactnType(xactn,outputArrayRow);
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

    symbol +=await getNftIdentifier(symbol,transferRow);

    return symbol;
}

async function getNftIdentifier(symbol,transferRow) {
    let nftIdentifier='';
    if (transferRow !== undefined && transferRow.value !== undefined)
    {
        nftIdentifier='#' + transferRow.value.repr.substring(1);
    }
    return nftIdentifier;
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
                if (decPrice === 0) {
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

async function getXactnType(xactn,outputArrayRow) {
    let xactnType='Unknown';
    if (outputArrayRow.inAmountRaw>0) {
        if (outputArrayRow.outAmountRaw>0) {
            xactnType='Trade';
        } else {
            xactnType='Receive'
        }   
    } else if (outputArrayRow.outAmountRaw>0) {
        xactnType='Send'
    } else {
        xactnType='Xactn Fee'
    }

    return xactnType;
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

// async function utilityGetCoinFromCoinGecko(coin) {
//     var now = new Date(2021, 11, 29);
//     for (var thisDate = new Date(2021, 11, 20); thisDate <= now; thisDate.setDate(thisDate.getDate() + 1)) {
//         let price=await getPriceFromCoinGecko(coin,thisDate.toISOString())
//         console.log("{ date: '" + thisDate.toISOString() + "', coin: '" + coin + "', price: '" + price + "'},");

//     }
// }