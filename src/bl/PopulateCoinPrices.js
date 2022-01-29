import USDA_STX from "../bo/workingprices/USDA_STX"
import STX_USDT from "../bo/workingprices/STX_USDT"
import USDA_USDT from "../bo/workingprices/USDA_USDT"
import DIKO_USDA from "../bo/workingprices/DIKO_USDA"
import { Decimal } from 'decimal.js'

export default function getPricesInUSDT(symbol,isOutputUnixDate=false) {
    let sourcePricingArray;
    let targetPricingArray;
    let isPriceInTarget=false;
    if (symbol === 'USDA')
    {
        sourcePricingArray=STX_USDT.stxPricesInUSDT();
        targetPricingArray=USDA_STX.usdaPricesInStx();
        isPriceInTarget=true;
    } else if (symbol ==='DIKO') {
        sourcePricingArray=USDA_USDT.usdaPricesInUsdt();
        targetPricingArray=DIKO_USDA.dikoPricesInUSDA();
    }
    calculatePricesInUSDT(symbol,sourcePricingArray,targetPricingArray,isPriceInTarget,isOutputUnixDate);

}

function calculatePricesInUSDT(symbol,sourcePricingArray,targetPricingArray,isPriceInTarget,isOutputUnixDate) {

    let finalOutput=[];
    let convertedPrices=convertPriceFromSourceToTarget(sourcePricingArray,targetPricingArray,isPriceInTarget);
    let currentDate=convertedPrices[0].unixDate;
    let priceArray=[];
    for (const priceRow of convertedPrices) {
        if (currentDate !== priceRow.unixDate)
        {
            let outputRow=generateCoinOutputRow(symbol,currentDate,priceArray,isOutputUnixDate);
            finalOutput.push(outputRow);
            currentDate=priceRow.unixDate;
            priceArray=[];
        }
        priceArray.push(priceRow.price);
    }
    let outputRow=generateCoinOutputRow(symbol,currentDate,priceArray,isOutputUnixDate);
    finalOutput.push(outputRow);
}

function convertPriceFromSourceToTarget(sourcePricingArray,targetPricingArray,isPriceInTarget)
{
    let convertedPrices=[];
    for (const priceRow of targetPricingArray) {
        let matchingPrice = sourcePricingArray.filter(function(item) {
            return (item.unixDate <= priceRow.unixDate);
        });
        let output;
       if (matchingPrice.length>0) {
           let sourcePrice = matchingPrice[matchingPrice.length-1].price;
           let targetPrice;
           if (isPriceInTarget)
           {
               targetPrice = new Decimal(sourcePrice) /new Decimal(priceRow.price);
           } else {
               targetPrice = new Decimal(priceRow.price) * new Decimal(sourcePrice);
           }
           output = { unixDate: priceRow.unixDate , price: targetPrice};
       } else {
            output = { unixDate: priceRow.unixDate , price: 'N/A'};
       }
       convertedPrices.push(output);
    }
    return convertedPrices;
}

function generateCoinOutputRow(symbol,currentDate,priceArray,isOutputUnixDate) {
    let price=priceArray.reduce((a, b) => a + b, 0);
    price = new Decimal(price) / new Decimal(priceArray.length);
    let outputRow;
    if (isOutputUnixDate)
    {
        //outputRow={ unixDate: currentDate, coin: symbol, price: price};
        outputRow=currentDate+','+price;
    }
    else
    {
        outputRow={ date: new Date(parseInt(currentDate)).toISOString(), coin: symbol, price: price};
    }
    console.log(outputRow);
    return outputRow;
}
