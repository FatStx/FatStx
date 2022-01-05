import { Configuration, BlocksApi } from "@stacks/blockchain-api-client";

export default async function getBlockInfo() {

  var currentBlock = await getCurrentBlock();
  var cycleSize = 2100;

  var miaStartingBlock = 24497;
  var miaCurrentCycle = Math.floor((parseInt(currentBlock) - miaStartingBlock) / cycleSize);
  var miaCycleStartingBlock = miaStartingBlock + miaCurrentCycle * cycleSize;
  var miaCycleEndBlock = miaStartingBlock - 1 + (miaCurrentCycle + 1) * cycleSize;
  var miaCyclePercentComplete = Math.floor(((currentBlock - miaCycleStartingBlock) * 100) / (miaCycleEndBlock - miaCycleStartingBlock)) ;

  var nycStartingBlock = 37449;
  var nycCurrentCycle = Math.floor((parseInt(currentBlock) - nycStartingBlock) / cycleSize);
  var nycCycleStartingBlock = nycStartingBlock + nycCurrentCycle * cycleSize;
  var nycCycleEndBlock = nycStartingBlock - 1 + (nycCurrentCycle + 1) * cycleSize;
  var nycCyclePercentComplete = Math.floor(((currentBlock - nycCycleStartingBlock) * 100) / (nycCycleEndBlock - nycCycleStartingBlock));
  
  return {
      "currentBlock": currentBlock, 
      "miaCurrentCycle": miaCurrentCycle, 
      "miaCycleStartingBlock": miaCycleStartingBlock, 
      "miaCycleEndBlock": miaCycleEndBlock, 
      "miaCyclePercentComplete": miaCyclePercentComplete,
      "nycCurrentCycle": nycCurrentCycle, 
      "nycCycleStartingBlock": nycCycleStartingBlock, 
      "nycCycleEndBlock":  nycCycleEndBlock, 
      "nycCyclePercentComplete": nycCyclePercentComplete
    };
}

async function getCurrentBlock() {

  var apiConfig = new Configuration({
    fetchApi: fetch,
    basePath: process.env.REACT_APP_STX_API_ENDPOINT,
  });

  var blocksApi = new BlocksApi(apiConfig);

  const blockList = await blocksApi.getBlockList({ offset: 0, limit: 1 });
  const currentBlock = blockList.results[0].height;

  return currentBlock
}



