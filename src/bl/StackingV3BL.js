import { getUserIdForPrincipal,getStackerForUserId} from '../api/CityCoinsProtocolApi'
import { getLatestBitcoinBlock,getBitcoinBlockTimes} from '../api/MiscApis'
import { filterStackingResultsForOutput,formatStackingResultsForOutput,createOutputRow} from './StackingSharedBL'
const FIRST_STACKING_BLOCK = 666050;
const REWARD_CYCLE_LENGTH = 2100;
//const coinContract ='SP8A9HZ3PKST0S42VM9523Z9NV42SZ026V4K39WH.ccd007-citycoin-stacking'

// async sleep timer
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function getStackingReportArrayV3(walletId,symbol) {
    const cityId=getcityIdForSymbol(symbol);
    let outputArray=[];
    const userId=await getUserIdForPrincipal(walletId);
    await sleep(500);
    if (userId === null) {
        outputArray.push({message: 'Unexpected error trying to obtain City Coins data. Please try again in a few minutes.'});
        return outputArray;
    } else if (userId === 0) {
        outputArray.push({message: 'User has never stacked City Coins with the V3 contract'});
        return outputArray;        
    }
    const latestBitcoinBlock= await getLatestBitcoinBlock();
    if (latestBitcoinBlock === null) {
        outputArray.push({message: 'Unexpected error trying to obtain latest bitcoin block. Please refresh browser and try again in several minutes'});        
        return outputArray;
    }

    let cycle=54;
    let errorFlag=false;
    const currentCycle=await getCurrentRewardCycle(latestBitcoinBlock);
    var cyclesToCheckTimeStamp = [];
    while(cycle<100) {
        const stackingInfo=await getStackerForUserId(cityId,cycle,userId);
        if (stackingInfo === null) {
            errorFlag=true;
            break;
        } else if (stackingInfo.stacked < 1) {
            if (cycle>currentCycle+1) {
                break;
            } else {
                cycle+=1;
                continue;
            }
        }
        await sleep(1000);
        const startBlock=await getStartBlockForBitcoinRewardCycle(cycle);
        const endBlock=await getEndBlockForBitcoinRewardCycle(cycle);
        const stackedCoins=parseFloat(stackingInfo.stacked)/1000000;
        const canClaimCoin=canClaimCoinForCycle(stackingInfo.claimable,latestBitcoinBlock,endBlock);
        let endBlockDate="";
        if (endBlock<=latestBitcoinBlock)
        {
            cyclesToCheckTimeStamp.push(endBlock);
        } else {
            endBlockDate=getFutureBitcoinBlockEndDates(latestBitcoinBlock,endBlock);
        }
        let outputRow=createOutputRow(cycle,startBlock,endBlock,endBlockDate,stackedCoins,0,"",canClaimCoin);
        outputArray.push(outputRow);        
        cycle+=1;
    }
    if (errorFlag) {
        outputArray.push({message: 'Unexpected error checking stacking cycle data. Please try again in a few minutes.'});
        return outputArray;        
    }
    if (outputArray.length <1) {
        outputArray.push({message: 'User has never stacked this City Coin with the V3 contract'});
        return outputArray;
    }

    let blockTimes=null;
    if (cyclesToCheckTimeStamp.length>0)
    {
        blockTimes= await getBitcoinBlockTimes(cyclesToCheckTimeStamp.join(','));
        for (const arrayRow of outputArray) {
            const rowTimeStampListRow=blockTimes.filter(function(item){
                return (item.height === arrayRow.endBlock);
            })[0];
            arrayRow.endBlockDate = rowTimeStampListRow.timestamp.toISOString();
        }
    }
    outputArray = filterStackingResultsForOutput(outputArray);
    outputArray = formatStackingResultsForOutput(outputArray);
//    console.log(outputArray);
    return outputArray;

}

function getFutureBitcoinBlockEndDates(currentBitCoinBlock,targetBlock) {
    const currentDate = new Date().toISOString();
    let minutestoAdd=parseInt(targetBlock-currentBitCoinBlock)*10;
    let blockTime=new Date((new Date(currentDate)).getTime() + (minutestoAdd* 60 * 1000));
    return blockTime.toISOString();
}

function canClaimCoinForCycle(claimable,latestBitcoinBlock,endBlock) {
    if (latestBitcoinBlock<=endBlock) {
        return "No";
    } else if (claimable !== 0) {
        return "Yes";
    } else {
        return "No";
    }
}

async function getCurrentRewardCycle(currentBitCoinBlock) {
    if (!currentBitCoinBlock) {
        currentBitCoinBlock= await getLatestBitcoinBlock();
    }
    const ret = Math.floor((currentBitCoinBlock-FIRST_STACKING_BLOCK)/REWARD_CYCLE_LENGTH)
    return(ret);
}

async function getStartBlockForBitcoinRewardCycle(targetCycle) {
    return (FIRST_STACKING_BLOCK+(REWARD_CYCLE_LENGTH*targetCycle));
}

async function getEndBlockForBitcoinRewardCycle(targetCycle) {
    const res= await getStartBlockForBitcoinRewardCycle(targetCycle+1)-1;
    return res;
}
function getcityIdForSymbol(symbol) {
    if (symbol === 'MIA') {
        return 1;
    } else if (symbol === 'NYC') {
        return 2;
    }
    return 0;
}