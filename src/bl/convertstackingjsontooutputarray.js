//import { MIAStackingList } from "./cities/miastackinglist"
import { NYCStackingList } from '../bo/cityarrays/nycstackinglist'
//import processAllXactnWithTransfersApiPages from '../stxapicalls'

export default async function convertStackingJsonToOutputArray(json) {
    let outputArray = NYCStackingList.stackingList;

//    json=await processAllXactnWithTransfersApiPages(walletId);
    for (const xactn of json) {
        if (xactn.tx.tx_status === 'success') {
            outputArray = await processTransactionForStacking(outputArray, xactn);
        }
    }

    outputArray = await populateFutureBlockEndDates(outputArray);
    return outputArray.filter(function(item){return (item.endBlockDate!=="");}).sort((a) => parseInt(a.endBlock));

}


function processTransactionForStacking(outputArray,xactn) {
    const functionName=xactn.tx.contract_call===undefined?'':xactn.tx.contract_call.function_name;
    const blockHeight=xactn.tx.block_height;

    if (functionName==='stack-tokens') {
        outputArray=processStackTokensTransaction(xactn,outputArray,blockHeight);
    } else if (functionName==="claim-stacking-reward") {
        outputArray=processClaimTransaction(xactn,outputArray,blockHeight);
    } 
    
    return outputArray;
}

//Process a stack-tokens transaction
function processStackTokensTransaction(xactn,outputArray,blockHeight){

    let cycleCount=xactn.tx.contract_call.function_args[1].repr.substring(1);
    let firstCycleListRow=outputArray.filter(function(item){
        return (item.startBlock<=blockHeight && item.endBlock>=blockHeight);
    })[0];
    
    if (firstCycleListRow!==undefined) {
        let firstCycle=firstCycleListRow.round+1;
        let lastCycle=parseInt(firstCycle)+parseInt(cycleCount)-1;
        const amount=xactn.tx.contract_call.function_args[0].repr.substring(1);
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
function processClaimTransaction(xactn,outputArray,blockHeight){

    const rewardsCycle=xactn.tx.contract_call.function_args[0].repr.substring(1);
    for (const event of xactn.tx.events) {
        if (event.event_type==='stx_asset')
        {
            const rewardsAmount= parseInt(event.asset.amount)/1000000;
            outputArray[rewardsCycle].claimedRewards=rewardsAmount;
            outputArray[rewardsCycle].claimDate=blockHeight;
            console.log(Date.now()+' Claimed ' + rewardsAmount + 'STX from this cycle');
            break;
        }
    }
    return outputArray;
}




//this populates up to three future block end dates, plus any past block end dates which aren't hard coded yet
async function populateFutureBlockEndDates(outputArray)
{
    const currentBlock=await getCurrentBlock();
    const currentDate = new Date().toISOString();
    let ctr=0;
    for (const stackingRound of outputArray.filter(function(item){return (item.endBlockDate==="");}).sort((a) => parseInt(a.endBlock)))
    {
        if (parseInt(stackingRound.endBlock)>parseInt(currentBlock))
        {
            ctr+=1
            let minutestoAdd=await parseInt(stackingRound.endBlock-currentBlock)*10;
            let blockTime=await new Date((new Date(currentDate)).getTime() + (minutestoAdd* 60 * 1000));

            stackingRound.endBlockDate=blockTime.toISOString();
        }

        
        if (ctr>2)
        {
            break;
        }
    }

    return outputArray;
}

//TODO: MOve to an api js file / merge with the one form the react
async function getCurrentBlock(){
    let url = "https://stacks-node-api.mainnet.stacks.co/extended/v1/block?limit=1";
    const response = await fetch(url);
    let json=await response.json();
    return json.results[0].height;

}