import { stxPrices } from "./stxprices";
import { Token } from "./tokens"
import { STX } from "./stxprices"

export default async function convertJsonToOutputArray(json,walletId)
{
    let outputArray=[];
    for (const xactn of json) {
        if (xactn.tx.tx_status=="success")
        {
            outputArray=await addOutputArrayRowsForXactn(outputArray,xactn,walletId);
        }
    }
    return outputArray;
}

async function addOutputArrayRowsForXactn(outputArray,xactn,walletId)
{
    let outputRowRawData= await getOutputRowsForXactn(xactn,walletId);
    await console.log(xactn);
    for (var ctr = 0; ctr < outputRowRawData.rowCount; ctr+=1) {
        let outputRow=await getOutputArrayRowSTX(
            xactn,
            ctr==0?outputRowRawData.xactnFee:0,
            outputRowRawData.transfersIn[ctr],
            outputRowRawData.transfersOut[ctr]
            );
       outputArray.push(outputRow);
    }

    return outputArray;
}

async function getOutputRowsForXactn(xactn,walletId)
{
    //TODO: NFTs IN and OUT

    //XACTN FEE 
    let xactnFee=xactn.tx.sender_address==walletId?xactn.tx.fee_rate:0;
    let feeCtr=xactnFee>0?1:0;

    //IN
    let stxTransfersIn = await getSTXTransfersForXactn(xactn,walletId,true);
    let ftTransfersIn= await getFtCoinTransfersForXactn(xactn,walletId,true);
    let inCtr=stxTransfersIn.length+ ftTransfersIn.length;

    //OUT
    let stxTransfersOut = await getSTXTransfersForXactn(xactn,walletId,false);
    let ftTransfersOut=await getFtCoinTransfersForXactn(xactn,walletId,false);
    let outCtr=stxTransfersOut.length+ ftTransfersOut.length;
    
    let rowCount=Math.max(feeCtr, inCtr, outCtr);
    return {rowCount: rowCount,xactnFee: xactnFee,transfersIn: stxTransfersIn.concat(ftTransfersIn),transfersOut: stxTransfersOut.concat(ftTransfersOut)};
}

async function getFtCoinTransfersForXactn(xactn,walletId,isIncoming)
{
    //Exclude WSTX and only look at transactions for the passed direction
    //NOTE that there *might* be times we have to not exclude WSTX in the future
    let ftTransfers=xactn.ft_transfers.filter(function(item){

        return (item.asset_identifier !='SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.wrapped-stx-token::wstx'
                && item.recipient===(isIncoming?walletId:item.recipient)
                && item.sender===(isIncoming?item.sender:walletId)
                );
    });
    return ftTransfers;
}

async function getSTXTransfersForXactn(xactn,walletId,isIncoming)
{
    let ftTransfers=xactn.stx_transfers.filter(function(item){
        return (item.recipient===(isIncoming?walletId:item.recipient)
                && item.sender===(isIncoming?item.sender:walletId)
                );
    });
    return ftTransfers;
}

async function getOutputArrayRowSTX(xactn,xactnFee,transferIn,transferOut)
{
    let outputArrayRow=null;
    let inSymbol=await getTransferSymbol(transferIn);
    let outSymbol=await getTransferSymbol(transferOut);

    outputArrayRow=
    {
        burnDate: xactn.tx.burn_block_time_iso,
            inSymbol: inSymbol,
            inAmount: transferIn==undefined?0:transferIn.amount,
            outSymbol: outSymbol,
            outAmount: transferOut==undefined?0:transferOut.amount,
            xactnFee: xactnFee,
            inCoinPrice:  '',//transferIn.asset_identifier==undefined? await getSTXCoinPrice('STX',xactn.tx.burn_block_time_iso):'NA',
            outCoinPrice: '',//transferOut.asset_identifier==undefined? await getSTXCoinPrice('STX',xactn.tx.burn_block_time_iso):'NA',
            xactnFeeCoinPrice: '',//transferOut.asset_identifier==undefined? await getSTXCoinPrice('STX',xactn.tx.burn_block_time_iso):'NA',
            xactnType: 'TBD',
            xactnId: xactn.tx.tx_id
    };
    return outputArrayRow;
}

async function getTransferSymbol(transferRow)
{
    let symbol='';
    if (transferRow != undefined){
        if (transferRow.asset_identifier != undefined){
            let matchingToken = Token?.tokens?.filter(function(token){return (token.contract==transferRow.asset_identifier)});
            if (matchingToken?.length>0)
            {
                symbol=matchingToken[0].symbol;
            }
            else
            {
                symbol=transferRow.asset_identifier;
            }
        }
        else
        {
            symbol=STX;
        }
    }
    return symbol;
}

async function getCoinPrice(symbol,priceDate)
{
    let price=0;
    //For now going with one price per day
    priceDate=priceDate.substring(0,10)+'T00:00:00.000Z';
    return '';
}

async function getSTXCoinPrice(coin,priceDate)
{
    let price=0;
    priceDate=priceDate.substring(0,10)+'T00:00:00.000Z';
    let matchingPrice=stxPrices.filter(function(item){return (item.date==priceDate);});
    if (matchingPrice.length>0)
    {
        price=matchingPrice[0].price;
    }
    else
    {
        //TODO: call coingecko API if no match. But we can't make too many calls so need to think about it
        price=0;
    }
    return price;
}




//**************Just used by us to get coin history data, not real time.
async function utilityGetCoinFromCoinGecko(coin,priceDate)
{
    const baseUrl = "https://api.coingecko.com/api/v3/coins/blockstack/history?localization=false&date=";
    var now = new Date(2021,11,22);
    var daysOfYear = [];
    for (var thisDate = new Date(2021, 11, 1); thisDate <= now; thisDate.setDate(thisDate.getDate() + 1)) {
        var dateForCG=await getDateForCoinGecko(thisDate)
        let url = baseUrl+dateForCG;
        let response = await fetch(url);
        let json=null;
        if(response.status==200)
        {
            json = await response.json();
            await console.log("{ date: '" +thisDate.toISOString() + "', coin: 'STX', price: '" + json.market_data.current_price.usd +  "'},");
        }
    }
    //return [response.status,json];
}

async function getDateForCoinGecko(thisDate)
{
    let returnDate =  ("0" + thisDate.getDate()).slice(-2) + "-" + ("0"+(thisDate.getMonth()+1)).slice(-2) + "-" + thisDate.getFullYear();
    return returnDate;
}
