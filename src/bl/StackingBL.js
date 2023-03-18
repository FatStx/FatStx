import { MIAStackingList } from '../bo/cityarrays/MiaStackingCycles'
import { NYCStackingList } from '../bo/cityarrays/NycStackingCycles'
import { getCurrentBlock, getBlockTime} from '../api/StxApi'
import { filterStackingResultsForOutput,formatStackingResultsForOutput} from './StackingSharedBL'

export default async function convertJsonToStackingReportArray(json,symbol,version) {
    let outputArray = getStackingListArray(symbol);
    let coinContract=getCoinSmartContractAddress(symbol,version);

    for (const xactn of json) {

        if (xactn.tx.tx_status === 'success' && xactn.tx.contract_call !== undefined && xactn.tx.contract_call.contract_id===coinContract ) {
            outputArray = processTransactionForStacking(outputArray, xactn,version,symbol);
        }
    }

    outputArray = await populateFutureBlockEndDates(outputArray);
    outputArray = filterStackingResultsForOutput(outputArray);
    outputArray = formatStackingResultsForOutput(outputArray);
    return outputArray;

}

function getStackingListArray(symbol) {
    let stackingListArray;
    if (symbol==='MIA') {
        stackingListArray=MIAStackingList.stackingList();
    } else {
        stackingListArray=NYCStackingList.stackingList();
    }    

    return stackingListArray;
}

function getCoinSmartContractAddress(symbol,version)
{
    let coinContract;
    if (version === 'v3') {
        coinContract ='SP8A9HZ3PKST0S42VM9523Z9NV42SZ026V4K39WH.ccd007-citycoin-stacking'
    } else if (symbol==='MIA') {

        if (version==='v2') {
            coinContract = 'SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R.miamicoin-core-v2';
        } else {
            coinContract = 'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27.miamicoin-core-v1';
        }
    } else {
        if (version==='v2') {
            coinContract = 'SPSCWDV3RKV5ZRN1FQD84YE1NQFEDJ9R1F4DYQ11.newyorkcitycoin-core-v2';
        } else {
            coinContract = 'SP2H8PY27SEZ03MWRKS5XABZYQN17ETGQS3527SA5.newyorkcitycoin-core-v1';
        }
    }
    return coinContract;
}

function processTransactionForStacking(outputArray,xactn,version,symbol) {
    const functionName=xactn.tx.contract_call===undefined?'':xactn.tx.contract_call.function_name;
    const blockHeight=xactn.tx.block_height;

    if (functionName==='stack-tokens' || functionName==='stack') {
        outputArray=processStackTokensTransaction(outputArray,xactn,blockHeight,version,symbol);
    } else if (functionName==="claim-stacking-reward") {
        outputArray=processClaimTransaction(outputArray,xactn,blockHeight,version);
    } 

    return outputArray;
}

//Process a stack-tokens transaction
function processStackTokensTransaction(outputArray,xactn,blockHeight,version,symbol){

    let cycleCount=xactn.tx.contract_call.function_args[1].repr.substring(1);
    let firstCycleListRow=outputArray.filter(function(item){
        return (item.startBlock<=blockHeight && item.endBlock>=blockHeight);
    })[0];
    
    if (firstCycleListRow!==undefined) {
        let firstCycle=firstCycleListRow.round+1;
        let lastCycle=parseInt(firstCycle)+parseInt(cycleCount)-1;
        const lastV2Cycle=symbol ==='MIA'?34:28;
        lastCycle=lastCycle>lastV2Cycle?lastV2Cycle:lastCycle;
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

//this populates future block end dates, plus any past block end dates which aren't hard coded yet
async function populateFutureBlockEndDates(outputArray)
{
    const currentBlock=await getCurrentBlock();
    const currentDate = new Date().toISOString();
    for (const stackingRound of outputArray.filter(function(item){return (item.endBlockDate==='');}).sort((a) => parseInt(a.endBlock))) {
        if (parseInt(stackingRound.endBlock)>parseInt(currentBlock)) {
            let minutestoAdd=parseInt(stackingRound.endBlock-currentBlock)*10;
            let blockTime=new Date((new Date(currentDate)).getTime() + (minutestoAdd* 60 * 1000));

            stackingRound.endBlockDate=blockTime.toISOString();
        } else {
            let blockDate=await getBlockTime(stackingRound.endBlock);
            let blockTime=new Date(blockDate);
            stackingRound.endBlockDate=blockTime.toISOString();
        }
    }

    return outputArray;
}
