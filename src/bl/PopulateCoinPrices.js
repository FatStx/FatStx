 import { WorkingPrices } from "../bo/coinprices/WorkingPrices" 
 import { Decimal } from 'decimal.js'

export default function getUSDAPrices() {

    let finalOutput=[];
    let convertedPrices=convertPriceFromSourceToTarget(WorkingPrices.usdaPricesInStx(),WorkingPrices.stxPricesInUSDT());
    let currentDate=convertedPrices[0].unixDate;
    let priceArray=[];
    for (const priceRow of convertedPrices) {
        if (currentDate !== priceRow.unixDate)
        {
            let outputRow=generateCoinOutputRow('USDA',currentDate,priceArray);
            finalOutput.push(outputRow);
            currentDate=priceRow.unixDate;
            priceArray=[];
        }
        priceArray.push(priceRow.price);
    }
    let outputRow=generateCoinOutputRow('USDA',currentDate,priceArray);
    finalOutput.push(outputRow);
}

function convertPriceFromSourceToTarget(targetPricingArray,sourcePricingArray)
{
    let convertedPrices=[];
    for (const priceRow of targetPricingArray) {
        let matchingPrice = sourcePricingArray.filter(function(item) {
            return (item.unixDate <= priceRow.unixDate);
        });
        let output;
       if (matchingPrice.length>0) {
           let sourcePrice = matchingPrice[matchingPrice.length-1].price;
           let targetPrice = new Decimal(sourcePrice) / new Decimal(priceRow.price);
           output = { unixDate: priceRow.unixDate , price: targetPrice};
       } else {
            output = { unixDate: priceRow.unixDate , price: 'N/A'};
       }
       convertedPrices.push(output);
    }
    return convertedPrices;
}

function generateCoinOutputRow(symbol,currentDate,priceArray,isUnixDate=false) {
    let price=priceArray.reduce((a, b) => a + b, 0);
    price = new Decimal(price) / new Decimal(priceArray.length);
    let convertedDate=new Date(parseInt(currentDate)).toISOString();
    let outputRow={ date: convertedDate, coin: symbol, price: price};
    console.log(outputRow);
    return outputRow;
}
