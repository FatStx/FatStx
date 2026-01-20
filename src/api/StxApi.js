import { createClient } from '@stacks/blockchain-api-client';
// import { callReadOnlyFunction } from '@stacks/transactions';
// import { StacksMainnet } from '@stacks/network';

const BASEURL = import.meta.env.VITE_STX_API_ENDPOINT || 'https://api.hiro.so/';

// create a client (v8 style)
const client = createClient({
  baseUrl: BASEURL,
});

// Optional request hook - set a custom header if provided via env
client.use({
  onRequest({ request }) {
    const customHeader = import.meta.env.VITE_STX_API_CUSTOM_HEADER;
    if (customHeader) request.headers.set('x-custom-header', customHeader);
    return request;
  },
});

//Process All API Pages
export default async function processAllXactnWithTransfersApiPages(walletId, year = 'All') {
  let startDate = year === 'All' ? '2021-01-01T00:00:00.000Z' : year + '-01-01T00:00:00.000Z';
  let endDate =
    year === 'All'
      ? '2029-01-01T00:00:00.000Z'
      : (parseInt(year) + 1).toString() + '-01-01T00:00:00.000Z';

  var ret = await processXactnWithTransfersApiPagesForDateRange(walletId, startDate, endDate);
  return ret;
}

export async function processXactnWithTransfersApiPagesSinceStartBlock(walletId, startBlock) {
  console.log(Date.now() + `===Process All Api Pages Since Block ${startBlock}===`);
  let runningJson = [];
  let apiResult = await processOneXactnWithTransfersApiPage(0, walletId);
  let isApiError = false;
  if (apiResult[0] === 200) {
    let filterResults = filterBlocks(apiResult[1].results, startBlock);
    runningJson = filterResults[1];
    if (!filterResults[0]) {
      let totalTransactions = apiResult[1].total;
      //Loop Through all results after getting first page
      for (let i = 50; i <= totalTransactions; i += 50) {
        apiResult = await processOneXactnWithTransfersApiPage(i, walletId);
        if (apiResult[0] === 200) {
          filterResults = filterBlocks(apiResult[1].results, startBlock);
          runningJson = runningJson.concat(filterResults[1]);
          if (filterResults[0]) {
            break;
          }
        } else {
          isApiError = true;
          break;
        }
      }
    }
  } else {
    isApiError = true;
  }

  return [isApiError, runningJson];
}

export async function processXactnWithTransfersApiPagesForDateRange(walletId, startDate, endDate) {
  console.log(Date.now() + ' ===Process All Api Pages===');
  let runningJson = [];
  let apiResult = await processOneXactnWithTransfersApiPage(0, walletId);
  let isApiError = false;
  if (apiResult[0] === 200) {
    let filterResults = filterDates(apiResult[1].results, startDate, endDate);
    runningJson = filterResults[1];
    if (!filterResults[0]) {
      let totalTransactions = apiResult[1].total;
      //Loop Through all results after getting first page
      for (let i = 50; i <= totalTransactions; i += 50) {
        apiResult = await processOneXactnWithTransfersApiPage(i, walletId);
        if (apiResult[0] === 200) {
          let filterResults = filterDates(apiResult[1].results, startDate, endDate);
          runningJson = runningJson.concat(filterResults[1]);
          if (filterResults[0]) {
            break;
          }
        } else if (apiResult[0] === 429) {
          await new Promise((resolve) => setTimeout(resolve, 31000));
        } else {
          console.log(apiResult[0]);
          isApiError = true;
          break;
        }
      }
    }
  } else {
    isApiError = true;
  }

  return [isApiError, runningJson];
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
  // Try v2 info endpoint first
  try {
    const { data } = await client.GET('/v2/info');
    if (data && data.stacks_tip_height !== undefined) return data.stacks_tip_height;
  } catch (err) {
    // ignore and try fallback
  }

  // Fallback to block list
  try {
    const { data } = await client.GET('/extended/v2/blocks/', {
      params: { query: { offset: 0, limit: 1 } },
    });
    const currentBlock = data?.results?.[0]?.height ?? null;
    return currentBlock;
  } catch (err) {
    console.error('getCurrentBlock error', err);
    return null;
  }
}

export async function checkWallet(walletId) {
  //Not calling this one because it is far too slow for some reason
  let ret = await processOneApiPage(`/extended/v1/address/{address}/balances`, {
    path: { address: walletId },
  });
  if (ret[0] === 200 && ret[1].error === undefined) {
    return [true, walletId];
  } else {
    //Now need to check if it's a BNS address
    ret = await getWalletForBNSName(walletId);
    if (ret[0] === 200 && ret[1].address !== undefined) {
      return [true, ret[1].address];
    }
    return [false, walletId];
  }
}

export async function getBlockTime(blockHeight) {
  try {
    const { data } = await client.GET(`/extended/v1/block/by_height/{height}`, {
      params: { path: { height: blockHeight } },
    });
    return data?.burn_block_time_iso ?? '';
  } catch (err) {
    console.log(err);
    // fallback to generic fetch path
    const ret = await processOneApiPage(`/extended/v1/block/by_height/{height}`, {
      path: { height: blockHeight },
    });
    if (ret[0] === 200 && ret[1]?.burn_block_time_iso !== undefined) {
      return ret[1].burn_block_time_iso;
    }
    return '';
  }
}

async function getWalletForBNSName(bnsName) {
  console.log(Date.now() + ' ===Check BNS Name:' + bnsName + '===');
  let ret = await processOneApiPage(`/v1/names/{name}`, {
    path: { name: bnsName },
  });
  return ret;
}

//Fully process one 50 xactn call/page from the transactions with transfers API
async function processOneXactnWithTransfersApiPage(offset, walletId) {
  console.log(Date.now() + ' ===Process Api Page,Offset ' + offset + '===');
  let ret = await processOneApiPage(`/extended/v1/address/{address}/transactions_with_transfers`, {
    path: { address: walletId },
    query: {
      limit: 50,
      unanchored: false,
      offset: offset,
    },
  });
  return ret;
}

//Fully process one 50 xactn call/page from the API
async function processOneApiPage(path, params = {}) {
  try {
    let res;
    if (Object.keys(params).length) {
      res = await client.GET(path, { params });
    } else {
      res = await client.GET(path);
    }

    // client.GET returns an object with `data` (per v8 usage)
    const data = res?.data ?? res;
    return [200, data];
  } catch (err) {
    // Try to extract status code if available
    const status = err?.status ?? err?.response?.status ?? 500;
    console.error('processOneApiPage error', path, status);
    return [status, null];
  }
}

function filterDates(json, startDate, endDate) {
  let outputArray = [];
  let isComplete = true;
  let isAfterStartDate = false;
  for (const xactn of json) {
    let xactnDate = xactn.tx.burn_block_time_iso;
    isAfterStartDate = new Date(startDate) <= new Date(xactnDate);
    let isBeforeEndDate = new Date(endDate) >= new Date(xactnDate);
    if (isAfterStartDate) {
      if (isBeforeEndDate) {
        outputArray.push(xactn);
      }
    } else {
      break;
    }
  }

  if (isAfterStartDate) {
    isComplete = false;
  }
  return [isComplete, outputArray];
}

function filterBlocks(json, startBlock) {
  let outputArray = [];
  let isComplete = false;
  let isBeforeStartBlock = false;
  for (const xactn of json) {
    let blockHeight = xactn.tx.block_height;
    let isBeforeStartBlock = parseInt(startBlock) > parseInt(blockHeight);
    if (!isBeforeStartBlock) {
      outputArray.push(xactn);
    } else {
      break;
    }
  }

  if (isBeforeStartBlock) {
    isComplete = true;
  }
  return [isComplete, outputArray];
}
