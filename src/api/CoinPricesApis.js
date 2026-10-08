import { Token } from '../bo/TokenDefinitions';

//TODO: Proper Error handling, possibly chain then and catch to the fetch
export default async function getPriceFromCoinGecko(symbol, priceDate) {
  let price = 'N/A';
  //This is just a safety valve to avoid accidentally going back to far and getting throttled by coingecko
  if (new Date(priceDate).getTime() < new Date(2022, 12, 1).getTime()) {
    return price;
  }
  const baseUrl = 'https://api.coingecko.com/api/v3/coins/';
  let apiSymbol = getCoinPriceAPISymbol(symbol);
  if (apiSymbol !== '') {
    let dateForCG = getDateForCoinGecko(new Date(priceDate));
    let url = baseUrl + apiSymbol + '/history?localization=false&date=' + dateForCG;
    let response = await fetch(url).catch((error) => {
      console.log('Error Fetching Coin API Information');
    });
    if (response !== undefined && response.status === 200) {
      let json = await response.json();
      if (json.market_data !== undefined) {
        price = json.market_data.current_price.usd;
      }
    }
  }
  return price;
}

//TODO: Proper Error handling, possibly chain then and catch to the fetch
export async function getCurrencyPriceFromExternalApi(symbol, priceDate) {
  let price = 'N/A';
  //This is just a safety valve to avoid accidentally going back to far and getting throttled
  if (new Date(priceDate).getTime() < new Date(2022, 12, 1).getTime()) {
    return price;
  }
  const baseUrl = 'https://api.frankfurter.dev/v1/';
  if (symbol !== '') {
    let dateForApi = getDateForCurrencyApi(new Date(priceDate));
    let url = baseUrl + dateForApi + '?base=' + symbol + '&symbols=USD';
    let response = await fetch(url).catch((error) => {
      console.log('Error Fetching Currency API Information');
    });
    if (response !== undefined && response.status === 200) {
      let json = await response.json();
      if (json.rates !== undefined) {
        price = json.rates.USD;
      }
    }
  }
  return price;
}

function getCoinPriceAPISymbol(symbol) {
  let apiSymbol = '';
  if (symbol === 'STX') {
    apiSymbol = 'blockstack';
  } else {
    let matchingToken = Token?.tokens?.filter(function (token) {
      return token.symbol === symbol;
    });
    if (matchingToken?.length > 0) {
      apiSymbol = matchingToken[0].apiSymbol;
    }
  }

  return apiSymbol;
}

//DD-MM-YYYY
function getDateForCoinGecko(thisDate) {
  return getDateForCurrencyApi(thisDate).split('-').reverse().join('-');
}

//YYYY-MM-DD
function getDateForCurrencyApi(thisDate) {
  return new Date(thisDate).toISOString().substring(0, 10);
}
