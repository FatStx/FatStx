async function convertJsonToOutputArray(json,walletId)
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
    let outputArrayRow=await getOutputArrayRowsSTX(xactn,walletId);
    outputArray=await pushStacksBoardXactnToArray(outputArray,outputArrayRow);

    //outputArrayRow=await getOutputArrayRowsSTXOut(xactn,walletId);
    //outputArray=await pushStacksBoardXactnToArray(outputArray,outputArrayRow);

    return outputArray;
}

async function getOutputArrayRowsSTX(xactn,walletId)
{
    let outputArrayRow=null;
    if(xactn.stx_received>0 || xactn.stx_sent>0)
    {
        outputArrayRow=
        {
            burnDate: xactn.tx.burn_block_time_iso,
            inSymbol: 'STX',
            inAmount:xactn.stx_received,
            outSymbol: 'STX',
            outAmount: xactn.stx_sent,
            xactnFee: await getXactnFee(xactn,walletId),
            inCoinPrice: await getSTXCoinPrice('STX',xactn.tx.burn_block_time_iso),
            outCoinPrice: await getSTXCoinPrice('STX',xactn.tx.burn_block_time_iso),
            xactnType: 'TBD',
            xactnId: xactn.tx.tx_id
        };
    };
    return outputArrayRow;
}

async function getOutputArrayRowsSTXOut(xactn,walletId)
{
    let outputArrayRow=null;
    if(xactn.stx_sent>0)
    {
        outputArrayRow=
        {
            burnDate: xactn.tx.burn_block_time_iso,
            xactnDirection: "out",
            coinSymbol: 'STX',
            coinQuantity:xactn.stx_sent,
            coinPrice: await getSTXCoinPrice('STX',xactn.tx.burn_block_time_iso),
            xactnType: await getXactnType(xactn,"out"),
            xactnFee: await getXactnFee(xactn,walletId),
            xactnId: xactn.tx.tx_id
        };
    };
    return outputArrayRow;
}

async function getXactnType(xactn,xactnDirection)
{
    if (xactn.stx_sent===xactn.tx.fee_rate)
    {
        return "Xactn Fee";
    }
    else if (xactnDirection=="out")
    {
        return "Send";
    }
    else
    {
        return "Receive";
    }
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

//Determine if the transaction fee is paid by the wallet, and return it if it is
async function getXactnFee(xactn,walletId)
{
    let xactnFee=0;
    if (xactn.tx.sender_address==walletId)
    {
        xactnFee=parseInt(xactn.tx.fee_rate)/1000000;
    }
    return xactnFee;
}

async function pushStacksBoardXactnToArray(outputArray,outputArrayRow)
{
    if (outputArrayRow!=null)
    {
        await outputArray.push(outputArrayRow);
    }
    return outputArray;
}

//**************Just used by us to get coin history data, not real time.
async function utilityGetCoinFromCoinGecko(coin,priceDate)
{
    const baseUrl = "https://api.coingecko.com/api/v3/coins/blockstack/history?localization=false&date=";
    var now = new Date(2021,11,22);
    var daysOfYear = [];
    for (var thisDate = new Date(2021, 11, 01); thisDate <= now; thisDate.setDate(thisDate.getDate() + 1)) {
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
