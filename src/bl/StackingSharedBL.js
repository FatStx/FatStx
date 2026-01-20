export function filterStackingResultsForOutput(outputArray) {
  return outputArray
    .filter(function (item) {
      return item.stackedCoins > 0;
    })
    .sort((a) => parseInt(a.endBlock));
}

export function formatStackingResultsForOutput(outputArray) {
  for (var stackingRound of outputArray) {
    if (stackingRound.claimDate !== '') {
      stackingRound.claimDate = new Date(stackingRound.claimDate).toLocaleString([], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    if (stackingRound.endBlockDate !== '') {
      stackingRound.endBlockDate = new Date(stackingRound.endBlockDate).toLocaleString([], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }
  }
  return outputArray;
}

export function createOutputRow(
  cycle,
  startBlock,
  endBlock,
  endBlockDate,
  stackedCoins,
  claimedRewards,
  claimDate,
  canClaimCoin
) {
  let outputRow = {
    round: cycle,
    startBlock: startBlock,
    endBlock: endBlock,
    endBlockDate: endBlockDate,
    stackedCoins: stackedCoins,
    claimedRewards: 0,
    claimDate: '',
    canClaimCoin: canClaimCoin,
  };

  return outputRow;
}
// function processTransactionForStacking(outputArray,xactn,version) {
//     const functionName=xactn.tx.contract_call===undefined?'':xactn.tx.contract_call.function_name;
//     const blockHeight=xactn.tx.block_height;

//     if (functionName==='stack-tokens' || functionName==='stack') {
//         outputArray=processStackTokensTransaction(outputArray,xactn,blockHeight,version);
//     } else if (functionName==="claim-stacking-reward") {
//         outputArray=processClaimTransaction(outputArray,xactn,blockHeight,version);
//     }

//     return outputArray;
// }

// //Process a stack-tokens transaction
// function processStackTokensTransaction(outputArray,xactn,blockHeight,version){

//     let cycleCount=xactn.tx.contract_call.function_args[1].repr.substring(1);
//     let firstCycleListRow=outputArray.filter(function(item){
//         return (item.startBlock<=blockHeight && item.endBlock>=blockHeight);
//     })[0];

//     if (firstCycleListRow!==undefined) {
//         let firstCycle=firstCycleListRow.round+1;
//         let lastCycle=parseInt(firstCycle)+parseInt(cycleCount)-1;
//         let amount=xactn.tx.contract_call.function_args[0].repr.substring(1);
//         if(!(version === 'v1')){
//             amount=parseFloat(amount)/1000000;
//         }

//         console.log(Date.now()+' Stacked ' + amount + ' CityCoins from cycle ' + firstCycle + ' to ' + lastCycle);
//         outputArray=applyStackTokensTransaction(outputArray,amount,firstCycle,lastCycle)
//     }
//     return outputArray;
// }

// //Apply stack-tokens transaction to the list
// function applyStackTokensTransaction(outputArray,amount,firstCycle,lastCycle){
//     for (let i = firstCycle; i <=lastCycle ; i++) {
//         outputArray[i].stackedCoins=parseInt(outputArray[i].stackedCoins)+parseInt(amount);
//         outputArray[i].canClaimCoin=
//             i===lastCycle || outputArray[i].canClaimCoin==='STX+Coin'
//                 ?'STX+Coin'
//                 :'STX Only';
//     }
//     return outputArray;
// }

// //Process a claim-stacking-reward transaction, including applying to list
// //Currently only checking STX rewards, not coins being returned
// function processClaimTransaction(outputArray,xactn){

//     const rewardsCycle=xactn.tx.contract_call.function_args[0].repr.substring(1);
//     console.log(xactn);
//     const rawAmount=xactn.stx_received;

//     const rewardsAmount= parseInt(rawAmount)/1000000;
//             outputArray[rewardsCycle].claimedRewards=rewardsAmount;
//             outputArray[rewardsCycle].claimDate=xactn.tx.burn_block_time_iso;
//             console.log(Date.now()+' Claimed ' + rewardsAmount + 'STX from this cycle');

//     return outputArray;
// }
