import { Configuration, BlocksApi } from "@stacks/blockchain-api-client";

//TODO: Proper Error handling, possibly chain then and catch to the fetch
//Process All API Pages
export default async function processAllXactnWithTransfersApiPages(walletId,startDate='2021-12-27T00:00:00.000Z',endDate='2023-01-01T00:00:00.000Z') {
    console.log(Date.now() + " ===Process All Api Pages===");

    let apiResult = await processOneXactnWithTransfersApiPage(0, walletId);

    let runningJson = apiResult[1].results;
    let filteredArray=filterDates(runningJson,startDate,endDate);
    let totalTransactions = apiResult[1].total;

    //Loop Through all results after getting first page
    if (filteredArray.length ===50) {

        for (let i = 50; i <= totalTransactions; i += 50) {
            apiResult = await processOneXactnWithTransfersApiPage(i, walletId);
            //TODO: what if apiResult doesn't return what is expected?
            let filteredArray=filterDates(apiResult[1].results,startDate,endDate);
            runningJson = runningJson.concat(filteredArray);
            if (filteredArray.length !== 50) {
                break;
            }
        }
    }

    return runningJson;
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

// function validateDates(results) {


// }

//Fully process one 50 xactn call/page from the transactions with transfers API
async function processOneXactnWithTransfersApiPage(offset, walletId) {
    console.log(Date.now() + " ===Process Api Page,Offset " + offset + "===");
    const baseUrl = "https://stacks-node-api.mainnet.stacks.co/extended/v1/address/" + walletId + "/transactions_with_transfers?limit=50&unanchored=false&offset="
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
    let response = await fetch(url);
    let json = null;
    if (response.status === 200) {
        json = await response.json();
    }
    return [response.status, json];
}

function filterDates(json,startDate,endDate) {
    let outputArray = [];
    for (const xactn of json) {
        let xactnDate= xactn.tx.burn_block_time_iso;
        let isInRange=new Date(startDate)<=new Date(xactnDate);
        if (isInRange) {
            outputArray.push(xactn);
        } else {
            break;
        }
    }
    return outputArray;
}