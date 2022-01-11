import { Token } from '../bo/TokenDefinitions'

//TODO: Proper Error handling, possibly chain then and catch to the fetch
export default async function getPriceFromCoinGecko(symbol, priceDate) {
    let price='N/A';
    //This is just a safety valve to avoid accidentally going back to far and getting throttled by coingecko
    if (new Date(priceDate).getTime() < new Date(2022,0,5).getTime()) {
        return price;
    }
    const baseUrl = 'https://api.coingecko.com/api/v3/coins/';
    let apiSymbol=getCoinPriceAPISymbol(symbol);
    if (apiSymbol !=='')
    {
        let dateForCG = getDateForCoinGecko(new Date(priceDate))
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

function getCoinPriceAPISymbol(symbol) {
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

function getDateForCoinGecko(thisDate) {
    let workingDate=new Date(thisDate);
    let returnDate = workingDate.getUTCDate() + "-" + (parseInt(workingDate.getUTCMonth())+1) + "-" + workingDate.getUTCFullYear();
    return returnDate;
}