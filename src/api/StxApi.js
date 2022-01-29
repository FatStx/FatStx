import { Configuration, BlocksApi } from "@stacks/blockchain-api-client";

//Process All API Pages
export default async function processAllXactnWithTransfersApiPages(walletId, year='All') {

    let startDate = year === 'All'
                    ? '2021-01-01T00:00:00.000Z'
                    : year + '-01-01T00:00:00.000Z';
    let endDate = year === 'All'
                    ? '2023-01-01T00:00:00.000Z'
                    : (parseInt(year) + 1).toString() + '-01-01T00:00:00.000Z';

    console.log(Date.now() + " ===Process All Api Pages===");

    let runningJson=[];
    let apiResult = await processOneXactnWithTransfersApiPage(0, walletId);
    let isApiError= false;
    if (apiResult[0] === 200) {
        let filterResults=filterDates(apiResult[1].results,startDate,endDate);
        runningJson=filterResults[1];
        if (!filterResults[0]) {
            let totalTransactions = apiResult[1].total;
            //Loop Through all results after getting first page
            for (let i = 50; i <= totalTransactions; i += 50) {
                apiResult = await processOneXactnWithTransfersApiPage(i, walletId);
                if (apiResult[0] === 200) {
                    let filterResults=filterDates(apiResult[1].results,startDate,endDate);
                    runningJson = runningJson.concat(filterResults[1]);
                    if (filterResults[0]) {
                        break;
                    }
                } else {
                    isApiError=true;
                    break;
                }
            }
        }
    } else {
        isApiError=true;
    }
    return [isApiError,runningJson];
}

export async function getCurrentBlock() {

    var apiConfig = new Configuration({
      fetchApi: fetch,
      basePath: process.env.REACT_APP_STX_API_ENDPOINT,
    });
  
    var blocksApi = new BlocksApi(apiConfig);
  
    const blockList = await blocksApi.getBlockList({ offset: 0, limit: 1 });
    const currentBlock = blockList.results[0].height;
  
    return currentBlock
}

export async function isValidWallet(walletId) {
    //Not calling this one because it is far too slow for some reason
    //let baseUrl = "https://stacks-node-api.mainnet.stacks.co/v2/accounts/" + walletId;
    let baseUrl = 'https://stacks-node-api.mainnet.stacks.co/extended/v1/address/' + walletId + '/balances'
    let ret = await processOneApiPage(baseUrl);
    if (ret[0]===200 && ret[1].error === undefined)
    {
        return true;
    } else {
        return false;
    }
}

export async function getBlockTime(blockHeight) {
    let baseUrl = 'https://stacks-node-api.mainnet.stacks.co/extended/v1/block/by_height/' + blockHeight;
    let ret = await processOneApiPage(baseUrl);
    if (ret[0]===200 && ret[1].burn_block_time_iso !==undefined)
    {
        return ret[1].burn_block_time_iso;
    } else {
        return '';
    }
}

//Fully process one 50 xactn call/page from the transactions with transfers API
async function processOneXactnWithTransfersApiPage(offset, walletId) {
    console.log(Date.now() + " ===Process Api Page,Offset " + offset + "===");
    let baseUrl = "https://stacks-node-api.mainnet.stacks.co/extended/v1/address/" + walletId + "/transactions_with_transfers?limit=50&unanchored=false&offset="
    //This is just used for some testing error scenarios
    // if (offset===0)
    // {
    //     baseUrl = "https://stacks-node-api.mainnet.stacks.co/extended/v1/address/" + walletId + "/transactions_with_transfers?limit=50&unanchored=false&offset="
    // }

    let url = baseUrl + offset;
    let ret = await processOneApiPage(url);
    //Commented out because Syvita API missing nft transfer section
    // if (ret[0] !== 200 )
    // {
    //     const altUrl = "https://mainnet.syvita.org/extended/v1/address/" + walletId + "/transactions_with_transfers?limit=50&unanchored=false&offset="        
    //     url = altUrl + offset;
    //     ret = await processOneApiPage(url);
    // }
    return ret;
}


//Fully process one 50 xactn call/page from the API
async function processOneApiPage(url) {
    let response = await fetch(url).catch(error =>
        {
            console.log("Error Fetching API Information",url);
        });
    let json = null;
    let responseStatus=500;
    if (response !== undefined) {
        responseStatus=response.status;
        if (responseStatus === 200) {
            json = await response.json();
        }
    } 
    return [responseStatus, json];
}

function filterDates(json,startDate,endDate) {
    let outputArray = [];
    let isComplete=true;
    let isAfterStartDate=false;
    for (const xactn of json) {
        let xactnDate= xactn.tx.burn_block_time_iso;
        isAfterStartDate=new Date(startDate)<=new Date(xactnDate);
        let isBeforeEndDate=new Date(endDate)>=new Date(xactnDate);
        if (isAfterStartDate) {
            if (isBeforeEndDate)
            {
                outputArray.push(xactn);
            }
        } else {
            break;
        }
    }

    if (isAfterStartDate) {
        isComplete=false;
    }
    return [isComplete,outputArray];
}