import { getCurrentBlock } from '../api/StxApiCalls'
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

export function whenis(blockheight, currentBlock) {
  var deltaBlocks = blockheight - currentBlock;
  var deltaTime = deltaBlocks * 60 * 10 * 1000;
  var localUnixTime = new Date().getTime();
  var date = new Date(localUnixTime + deltaTime)
  return {
    "delta": moment(date).fromNow(),
    "at": date.toLocaleString()
  }
}

export function isPast(blockheight, currentBlock) {
  return blockheight > currentBlock
}

export async function getTrackedBlocks() {

  var currentBlock = await getCurrentBlock()
  var blocks = await fetch('https://raw.githubusercontent.com/foragerr/wenblok/main/blocks.json')
  var blocksJson = await blocks.json()

  blocksJson.sort(function(a, b) {
    return a.blockheight - b.blockheight
  });

  var futureBlocks = blocksJson.flatMap ( 
    x => (
      isPast(x.blockheight, currentBlock) ? { ...x, when: whenis(x.blockheight, currentBlock), past: isPast(x.blockheight, currentBlock) }
      : []
    )
  );

  var pastBlocks = blocksJson.flatMap ( 
    x => (
      !isPast(x.blockheight, currentBlock) ? { ...x, when: whenis(x.blockheight, currentBlock), past: isPast(x.blockheight, currentBlock) }
      : []
    )
  );

  return {
    "futureBlocks": futureBlocks,
    "pastBlocks": pastBlocks
  }

}



