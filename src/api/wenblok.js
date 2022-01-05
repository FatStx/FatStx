import { Configuration, BlocksApi } from "@stacks/blockchain-api-client";
import moment from 'moment';

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

export function whenis(blockheight, currentBlock, now) {
  var deltaBlocks = blockheight - currentBlock.height;
  var deltaTime = deltaBlocks * 60 * 10 * 1000;
  var localUnixTime = currentBlock.burn_block_time * 1000;
  var date = new Date(localUnixTime + deltaTime)
  return moment(date).fromNow() + " at " + date.toLocaleString()
}

export function isPast(blockheight, currentBlock) {
  return blockheight > currentBlock
}

export async function getTrackedBlocks() {

  var now = new Date()
  var currentBlock = await getCurrentBlock()
  var blocks = await fetch('https://raw.githubusercontent.com/foragerr/wenblok/main/blocks.json')
  var blocksJson = await blocks.json()

  blocksJson.sort(function(a, b) {
    return a.blockheight - b.blockheight
  });

  var futureBlocks = blocksJson.flatMap ( 
    x => (
      isPast(x.blockheight, currentBlock) ? { ...x, when: whenis(x.blockheight, currentBlock, now), past: isPast(x.blockheight, currentBlock) }
      : []
    )
  );

  var pastBlocks = blocksJson.flatMap ( 
    x => (
      !isPast(x.blockheight, currentBlock) ? { ...x, when: whenis(x.blockheight, currentBlock, now), past: isPast(x.blockheight, currentBlock) }
      : []
    )
  );

  return {
    "futureBlocks": futureBlocks,
    "pastBlocks": pastBlocks
  }

}



