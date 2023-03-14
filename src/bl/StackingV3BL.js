import { getUserIdForPrincipal,getStackerForUserId} from '../api/CityCoinsProtocolApi'
import { getLatestBitcoinBlock,getBitcoinBlockTimes} from '../api/MiscApis'
const FIRST_STACKING_BLOCK = 666050;
const REWARD_CYCLE_LENGTH = 2100;
const coinContract ='SP8A9HZ3PKST0S42VM9523Z9NV42SZ026V4K39WH.ccd007-citycoin-stacking'

// async sleep timer
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function getStackingReportArrayV3(walletId,symbol) {
    let outputArray=[];
    const userId=await getUserIdForPrincipal(walletId);
    await sleep(500);
    //TODO: Need to communicate that the user has no stacking
    if (userId === null) return outputArray;
    const latestBitcoinBlock= await getLatestBitcoinBlock();
    if (latestBitcoinBlock === null) {
        return outputArray;
    }

    let cycle=54;
    var cyclesToCheckTimeStamp = [];
    while(cycle<65) {
        const stackingInfo=await getStackerForUserId(1,cycle,userId);
        if (stackingInfo === null) break;
        const startBlock=await getStartBlockForRewardCycle(cycle);
        const endBlock=await getEndBlockForRewardCycle(cycle);
        const stackedCoins=parseFloat(stackingInfo.stacked)/1000000;
        const canClaimCoin=canClaimCoinForCycle(stackingInfo.claimable,latestBitcoinBlock,endBlock);
        let endBlockDate="";
        if (endBlock<=latestBitcoinBlock)
        {
            cyclesToCheckTimeStamp.push(endBlock);
        } else {
            endBlockDate=getFutureBitcoinBlockEndDates(latestBitcoinBlock,endBlock).substring(0, 10);
        }
        let outputRow={ round: cycle, 
            startBlock: startBlock, 
            endBlock: endBlock, 
            endBlockDate: endBlockDate,
            stackedCoins: stackedCoins, 
            claimedRewards: 0, 
            claimDate: "", 
            canClaimCoin: canClaimCoin  };
        outputArray.push(outputRow);        
        cycle+=1;
    }

    let blockTimes=null;
    if (cyclesToCheckTimeStamp.length>0)
    {
        blockTimes= await getBitcoinBlockTimes(cyclesToCheckTimeStamp.join(','));
        for (const arrayRow of outputArray) {
            const rowTimeStampListRow=blockTimes.filter(function(item){
                return (item.height === arrayRow.endBlock);
            })[0];
            arrayRow.endBlockDate = rowTimeStampListRow.timestamp.toISOString().substring(0, 10);
        }
    }

    console.log(outputArray);
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

async function getStartBlockForRewardCycle(targetCycle) {
    return (FIRST_STACKING_BLOCK+(REWARD_CYCLE_LENGTH*targetCycle));
}

async function getEndBlockForRewardCycle(targetCycle) {
    const res= await getStartBlockForRewardCycle(targetCycle+1)-1;
    return res;
}

function processTransactionForStacking(outputArray,xactn,version) {
    const functionName=xactn.tx.contract_call===undefined?'':xactn.tx.contract_call.function_name;
    const blockHeight=xactn.tx.block_height;

    if (functionName==='stack-tokens' || functionName==='stack') {
        outputArray=processStackTokensTransaction(outputArray,xactn,blockHeight,version);
    } else if (functionName==="claim-stacking-reward") {
        outputArray=processClaimTransaction(outputArray,xactn,blockHeight,version);
    } 

    return outputArray;
}

//Process a stack-tokens transaction
function processStackTokensTransaction(outputArray,xactn,blockHeight,version){

    let cycleCount=xactn.tx.contract_call.function_args[1].repr.substring(1);
    let firstCycleListRow=outputArray.filter(function(item){
        return (item.startBlock<=blockHeight && item.endBlock>=blockHeight);
    })[0];
    
    if (firstCycleListRow!==undefined) {
        let firstCycle=firstCycleListRow.round+1;
        let lastCycle=parseInt(firstCycle)+parseInt(cycleCount)-1;
        let amount=xactn.tx.contract_call.function_args[0].repr.substring(1);
        if(!(version === 'v1')){
            amount=parseFloat(amount)/1000000;
        }

        console.log(Date.now()+' Stacked ' + amount + ' CityCoins from cycle ' + firstCycle + ' to ' + lastCycle);
        outputArray=applyStackTokensTransaction(outputArray,amount,firstCycle,lastCycle)
    }
    return outputArray;
}

//Apply stack-tokens transaction to the list
function applyStackTokensTransaction(outputArray,amount,firstCycle,lastCycle){
    for (let i = firstCycle; i <=lastCycle ; i++) {
        outputArray[i].stackedCoins=parseInt(outputArray[i].stackedCoins)+parseInt(amount);
        outputArray[i].canClaimCoin=
            i===lastCycle || outputArray[i].canClaimCoin==='STX+Coin'
                ?'STX+Coin'
                :'STX Only';
    }
    return outputArray;
}

//Process a claim-stacking-reward transaction, including applying to list
//Currently only checking STX rewards, not coins being returned
function processClaimTransaction(outputArray,xactn){

    const rewardsCycle=xactn.tx.contract_call.function_args[0].repr.substring(1);
    console.log(xactn);
    const rawAmount=xactn.stx_received;

    const rewardsAmount= parseInt(rawAmount)/1000000;
            outputArray[rewardsCycle].claimedRewards=rewardsAmount;
            outputArray[rewardsCycle].claimDate=xactn.tx.burn_block_time_iso;
            console.log(Date.now()+' Claimed ' + rewardsAmount + 'STX from this cycle');

    return outputArray;
}

function filterStackingResultsForOutput(outputArray) {
    return outputArray.filter(function(item){return (item.stackedCoins>0);}).sort((a) => parseInt(a.endBlock))
}

function formatStackingResultsForOutput(outputArray) {
    for (var stackingRound of outputArray) {
        if(stackingRound.claimDate!=='')
        {
            stackingRound.claimDate=new Date(stackingRound.claimDate).toLocaleString([],{year: "numeric", month: "2-digit", day: "2-digit",hour: "2-digit", minute:"2-digit"});
        }
        if(stackingRound.endBlockDate!=='')
        {
            stackingRound.endBlockDate=new Date(stackingRound.endBlockDate).toLocaleString([],{year: "numeric", month: "2-digit", day: "2-digit"});
        }
    }
    return outputArray
}


