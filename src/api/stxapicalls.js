import { Configuration, BlocksApi } from "@stacks/blockchain-api-client";

//TODO: Proper Error handling, possibly chain then and catch to the fetch
//Process All API Pages
export default async function processAllXactnWithTransfersApiPages(walletId) {
    console.log(Date.now() + " ===Process All Api Pages===");

    let apiResult = await processOneXactnWithTransfersApiPage(0, walletId);
    let totalTransactions = apiResult[1].total;
    let runningJson = apiResult[1].results;
    //Loop Through all results after getting first page
    if (totalTransactions > 50) {

        for (let i = 50; i <= totalTransactions; i += 50) {
            apiResult = await processOneXactnWithTransfersApiPage(i, walletId);
            runningJson = await runningJson.concat(apiResult[1].results);
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

//Fully process one 50 xactn call/page from the asset API
async function processOneXactnWithTransfersApiPage(offset, walletId) {
    console.log(Date.now() + " ===Process Api Page,Offset " + offset + "===");
    const baseUrl = "https://stacks-node-api.mainnet.stacks.co/extended/v1/address/" + walletId + "/transactions_with_transfers?limit=50&unanchored=false&offset="

    let url = baseUrl + offset;
    let response = await fetch(url);
    let json = null;
    if (response.status === 200) {
        json = await response.json();
    }
    return [response.status, json];
}
