import { MonkeyStaking } from '../bo/contractcalls/MonkeyStaking'
import {processXactnWithTransfersApiPagesForDateRange, makeReadOnlyContractCall} from '../api/StxApi'
import { standardPrincipalCV, callReadOnlyFunction } from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';
import { connectWebSocketClient } from '@stacks/blockchain-api-client';

export async function getBananasPendingHarvest() {
    //let startDate=await getMostRecentSavedStakingContractCallDate();
    //let walletArray=await getWalletsWithStakedMonkeys(startDate);

    let walletArray=MonkeyStaking.StakingWalletList();
    const harvestWalletArray=await getHarvestWalletArray(walletArray);
    let runningTotal=0;
    for (const arrayRow of harvestWalletArray) {
       runningTotal+=(parseInt(arrayRow.harvestAmt)/1000000);
       console.log(arrayRow.walletId,'\t',parseInt(arrayRow.harvestAmt)/1000000);
    }
    return runningTotal;

}

async function getMostRecentSavedStakingContractCallDate() {

    return '2022-03-07T00:00:00.000Z';
}

async function getWalletsWithStakedMonkeys (startDate) {

    let ContractId='SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C.btc-monkeys-staking';
    let ret=await processXactnWithTransfersApiPagesForDateRange(ContractId,startDate,'2023-01-01T00:00:00.000Z');
    let walletArray= [];
    for (const arrayRow of ret[1]) {
        if (arrayRow.tx.contract_call !== undefined) {
            if (arrayRow.tx.contract_call.function_name==='stake') {
                let existingWalletRow=walletArray.filter(function(item){return (item.walletId===arrayRow.tx.sender_address);});
                if (existingWalletRow.length===0) {
                    let outputArrayRow = {walletId: arrayRow.tx.sender_address};
                    walletArray.push(outputArrayRow);
                }
            }
        }        
    }

    return walletArray;
}


async function getHarvestWalletArray (walletArray) {
    let harvestWalletArray= [];
    let ctr=1;
    for (const arrayRow of walletArray) {
        const contractAddress= 'SP2KAF9RF86PVX3NEE27DFV1CQX0T4WGR41X3S45C';
        const contractName='btc-monkeys-staking';
        const functionName='check-harvest';
        const functionArgs=[standardPrincipalCV(arrayRow.walletId)];
        console.log(ctr);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const ret=await makeReadOnlyContractCall(contractAddress,contractName,functionName,functionArgs);
        ctr+=1;
        let outputArrayRow = {walletId: arrayRow.walletId,harvestAmt: String(ret.value)};
        harvestWalletArray.push(outputArrayRow);
    }
    return harvestWalletArray;
}
