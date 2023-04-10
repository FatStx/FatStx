import { Configuration, BlocksApi } from "@stacks/blockchain-api-client";
// import { callReadOnlyFunction } from '@stacks/transactions';
// import { StacksMainnet } from '@stacks/network';

const BASEURL = 'https://api.hiro.so/';
//Process All API Pages
export default async function processAllXactnWithTransfersApiPages(walletId, year='All') {
    let startDate = year === 'All'
                    ? '2021-01-01T00:00:00.000Z'
                    : year + '-01-01T00:00:00.000Z';
    let endDate = year === 'All'
                    ? '2029-01-01T00:00:00.000Z'
                    : (parseInt(year) + 1).toString() + '-01-01T00:00:00.000Z';

    var ret=await processXactnWithTransfersApiPagesForDateRange(walletId,startDate,endDate);
    return ret;

}

export async function processXactnWithTransfersApiPagesSinceStartBlock(walletId, startBlock) {

    console.log(Date.now() + `===Process All Api Pages Since Block ${startBlock}===`);
    let runningJson=[];
    let apiResult = await processOneXactnWithTransfersApiPage(0, walletId);
    let isApiError= false;
    if (apiResult[0] === 200) {
        let filterResults=filterBlocks(apiResult[1].results,startBlock);
        runningJson=filterResults[1];
        if (!filterResults[0]) {
            let totalTransactions = apiResult[1].total;
            //Loop Through all results after getting first page
            for (let i = 50; i <= totalTransactions; i += 50) {
                apiResult = await processOneXactnWithTransfersApiPage(i, walletId);
                if (apiResult[0] === 200) {
                    filterResults=filterBlocks(apiResult[1].results,startBlock);
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

export async function processXactnWithTransfersApiPagesForDateRange(walletId, startDate,endDate) {

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

// export async function makeReadOnlyContractCall(contractAddress,contractName,functionName,functionArgs)
// {
//     const options = {
//     contractAddress: contractAddress,
//     contractName: contractName,
//     functionName: functionName,
//     functionArgs: functionArgs,
//     network: new StacksMainnet(),
//     senderAddress: 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.btc-monkeys-staking',
//     };
//     const ret = await callReadOnlyFunction(options);
//     return ret;
    

// }

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

export async function checkWallet(walletId) {
    //Not calling this one because it is far too slow for some reason
    let url = `${BASEURL}extended/v1/address/${walletId}/balances`;
    let ret = await processOneApiPage(url);
    if (ret[0]===200 && ret[1].error === undefined)
    {
        return [true,walletId];
    } else {
        //Now need to check if it's a BNS address
        ret = await getWalletForBNSName(walletId);
        if (ret[0]===200 && ret[1].address !== undefined)
        {
            return [true,ret[1].address];
        }
        return [false,walletId];
    }
}

export async function getBlockTime(blockHeight) {
    let url = `${BASEURL}extended/v1/block/by_height/${blockHeight}`;
    let ret = await processOneApiPage(url);
    if (ret[0]===200 && ret[1].burn_block_time_iso !==undefined)
    {
        return ret[1].burn_block_time_iso;
    } else {
        return '';
    }
}

async function getWalletForBNSName(walletId) {
    console.log(Date.now() + " ===Check BNS Name:" + walletId + "===");
    let url = `${BASEURL}v1/names/${walletId}`;    
    let ret = await processOneApiPage(url);
    return ret;
}

//Fully process one 50 xactn call/page from the transactions with transfers API
async function processOneXactnWithTransfersApiPage(offset, walletId) {
    console.log(Date.now() + " ===Process Api Page,Offset " + offset + "===");
    const url = `${BASEURL}extended/v1/address/${walletId}/transactions_with_transfers?limit=50&unanchored=false&offset=${offset}`
    let ret = await processOneApiPage(url);
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

function filterBlocks(json,startBlock) {
    let outputArray = [];
    let isComplete=false;
    let isBeforeStartBlock=false;
    for (const xactn of json) {
        let blockHeight= xactn.tx.block_height;
        let isBeforeStartBlock=parseInt(startBlock)>parseInt(blockHeight);
        if (!isBeforeStartBlock)
        {
            outputArray.push(xactn);
        } else {
            break;
        }
    }

    if (isBeforeStartBlock) {
        isComplete=true;
    }
    return [isComplete,outputArray];
}