import { MIAStackingList } from "./cities/miastackinglist"

export default async function convertStackingJsonToOutputArray(json) {

    let outputArray = [];
    outputArray = MIAStackingList.localStackingList;
    outputArray = await populateFutureBlockEndDates(outputArray);
    return outputArray.filter(function(item){return (item.endBlockDate!=="");}).sort((a) => parseInt(a.endBlock));
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

//TODO: Move to an api js file
async function getCurrentBlock(){
    let url = "https://stacks-node-api.mainnet.stacks.co/extended/v1/block?limit=1";
    const response = await fetch(url);
    let json=await response.json();
    return json.results[0].height;

}