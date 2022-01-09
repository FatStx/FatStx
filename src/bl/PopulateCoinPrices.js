import USDA_STX from "../bo/workingprices/USDA_STX"
import STX_USDT from "../bo/workingprices/STX_USDT"
import USDA_USDT from "../bo/workingprices/USDA_USDT"
import DIKO_USDA from "../bo/workingprices/DIKO_USDA"
import { Decimal } from 'decimal.js'

export function getUSDAPricesInUSDT() {

    let finalOutput=[];
    let convertedPrices=convertPriceFromSourceToTarget(USDA_STX.usdaPricesInStx(),STX_USDT.stxPricesInUSDT());
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

export default function getDIKOPricesInUSDT() {

    let finalOutput=[];
    let convertedPrices=convertPriceFromSourceToTarget(DIKO_USDA.dikoPricesInUSDA(),USDA_USDT.usdaPricesInUsdt());
    let currentDate=convertedPrices[0].unixDate;
    let priceArray=[];
    for (const priceRow of convertedPrices) {
        if (currentDate !== priceRow.unixDate)
        {
            let outputRow=generateCoinOutputRow('DIKO',currentDate,priceArray);
            finalOutput.push(outputRow);
            currentDate=priceRow.unixDate;
            priceArray=[];
        }
        priceArray.push(priceRow.price);
    }
    let outputRow=generateCoinOutputRow('DIKO',currentDate,priceArray);
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
    let convertedDate=isUnixDate
                        ? currentDate
                        : new Date(parseInt(currentDate)).toISOString();
    let outputRow;
    if (isUnixDate)
    {
        outputRow={ unixDate: convertedDate, coin: symbol, price: price};
    }
    else
    {
        outputRow={ date: convertedDate, coin: symbol, price: price};
    }
    console.log(outputRow);
    return outputRow;
}
