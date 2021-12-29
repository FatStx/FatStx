async function processQueryString()
{
    const params = new URLSearchParams(window.location.search);
    if (params.has('city'))
    {
        let selectedCity=params.get('city');
        if (selectedCity==2)
        {
            document.getElementById('selectCity').value=2;
        }
        if (params.has('wallet'))
        {
            document.getElementById('walletAddress').value=params.get('wallet');
            await getWalletStackingData()
        }
    }
}

function generateUrl()
{
    let selectedCity=document.getElementById("selectCity").value;
    if (selectedCity!='1' && selectedCity !='2')
    {
        alert("Please select a city");
        return;
    }
    let walletId= document.getElementById("walletAddress").value;
    if (walletId.length<5)
    {
        alert("Please enter a valid wallet address");
        return;
    }
    let base_url = window.location.origin+window.location.pathname;
    let url=base_url+'?city='+selectedCity + '&wallet='+walletId;
}

async function getWalletStackingDataFromInput()
{
    let selectedCity=await document.getElementById("selectCity").value;
    if (selectedCity!='1' && selectedCity !='2')
    {
        await alert("Please select a city");
        return;
    }
    let walletId= await document.getElementById("walletAddress").value;
    if (walletId.length<5)
    {
        await alert("Please enter a valid wallet address");
        return;
    }
    
    if ('URLSearchParams' in window) {
        var searchParams = new URLSearchParams(window.location.search)
        searchParams.set("city", selectedCity);
        searchParams.set("wallet", walletId);
        var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
        history.pushState(null, '', newRelativePathQuery);
    }

    getWalletStackingData();
}

//main function call to get data for a wallet
async function getWalletStackingData() {
    let selectedCity=await document.getElementById("selectCity").value;
    if (selectedCity!='1' && selectedCity !='2')
    {
        await alert("Please select a city");
        return;
    }
    let walletId= await document.getElementById("walletAddress").value;
    if (walletId.length<5)
    {
        await alert("Please enter a valid wallet address");
        return;
    }
    await showSpinner();
   
    let stackingList;
    let coinsstackedlabel=await document.getElementById("coinsstackedlabel");
    if (selectedCity==='1')
    {   
        coinsstackedlabel.innerText="NYC Stacked";
        stackingList = await generateNYCStackingList();
    }
    else if (selectedCity ==='2')
    {
        coinsstackedlabel.innerText="MIA Stacked";
        stackingList = await generateMIAStackingList();
    }
    let ret=await processOneAssetApiPage(0,walletId,stackingList);
    if (ret[0] !=200)
    {
        await hideSpinner();
        return;
    }
    //Loop Through all results after getting first page
    for (let i = 50; i <=ret[2] ; i+=50) {
        ret=await processOneAssetApiPage(i,walletId,ret[1]);
    }
    
    await populateFutureBlockEndDates(stackingList);
    await clearStackingSummary();
    await applyToScreen(ret[1]);
    await hideSpinner();
}

async function showSpinner()
{
    document.getElementById("getStackingInfo").innerHTML='<span class="spinner-border spinner-border-sm"></span>Loading..'
}

async function hideSpinner()
{
    document.getElementById("getStackingInfo").innerHTML="Get Stacking Info"
}

async function clearStackingSummary()
{
    document.querySelectorAll('.newrow').forEach(e => e.remove());
}

//Fully process one 50 xactn call/page from the asset API
async function processOneAssetApiPage(offset,walletId,stackingList)
{
    await console.log(Date.now()+" ===Process Asset Page,Offset " + offset + "===");
    const baseUrl = "https://stacks-node-api.mainnet.stacks.co/extended/v1/address/" + walletId + "/assets?limit=50&unanchored=false&offset="
    //const baseUrl = "https://mainnet.syvita.org/extended/v1/address/" + walletId + "/assets?limit=50&unanchored=false&offset="
    
    let url = baseUrl+offset;
    let response = await fetch(url);
    let json = await response.json();
    if(response.status!=200)
    {
        await alert("Either you have entered an invalid wallet address or some sort of error has occurred checking the Stacks API. Please try again later.");
        return [response.status,null,0];
    }
    let xactnIds = await getTransactionIds(json);
    stackingList=await getStackingTransactions(xactnIds,stackingList);
    return [response.status,stackingList,json.total];
}

//Return all the transactionsids from the asset call which are to or from the nyc coin contract and which succeeded
async function getTransactionIds(json) {
    console.log(Date.now()+" getTransactionIds");

    let selectedCity=await document.getElementById("selectCity").value;
    let coinContract;
    if (selectedCity==='1')
    {      
        coinContract = "SP2H8PY27SEZ03MWRKS5XABZYQN17ETGQS3527SA5.newyorkcitycoin-core-v1";
    }
    else if (selectedCity ==='2')
    {
        coinContract = "SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27.miamicoin-core-v1";
    }
    
    let transactions = [];
    let myflag=false;

    for (const result of json.results) {
        if (result.asset!=undefined)
        {
            let sender = result.asset.sender;
            let recipient = result.asset.recipient;
            if (sender==coinContract || recipient ==coinContract)
            {
                await transactions.push(result.tx_id);
            }
        }
    }

    return transactions;
}

//Get the full stacking transaction for each txid, and populate the screen
async function getStackingTransactions(xactnIds,stackingList) {
    for (const xId of xactnIds)
    {
        let xactnData=await getTransactionDataFromAPI(xId);
        stackingList=await processTransaction(xactnData,stackingList);
    }
    return stackingList;
}

//Obtain the data for a single stacking transactions
async function getTransactionDataFromAPI(xId)
{
    await console.log(Date.now()+" getTransactionDataFromAPI: "+xId);
    var url = "https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/" + xId;
    const response = await fetch(url);
    const ret=response.json();
    return ret;
}

//process the data for a single transactions, including applying to list.
async function processTransaction(xactnData,stackingList)
    {
        await console.log(Date.now()+" processTransaction");
        const functionName=xactnData.contract_call.function_name;
        const blockHeight=xactnData.block_height;
        const burnBlockTime = xactnData.burn_block_time_iso;
        if (functionName==="stack-tokens")
        {
            stackingList=await processStackTokensTransaction(xactnData,stackingList);
        }
        if (functionName==="claim-stacking-reward")
        {
            stackingList=await processClaimTransaction(xactnData,stackingList);
        } 
        return stackingList;
    }

//Process a stack-tokens transaction, including applying to list
async function processStackTokensTransaction(data,stackingList){
    await console.log(Date.now()+" processStackTokensTransaction");

    let cycleCount=data.contract_call.function_args[1].repr.substring(1);
    let xactnCycle=data.block_height;
    let firstCycleListRow=stackingList.filter(function(item){return (item.startBlock<=xactnCycle && item.endBlock>=xactnCycle);})[0];
    if (firstCycleListRow!=undefined)
    {
        let firstCycle=firstCycleListRow.round+1;
        let lastCycle=parseInt(firstCycle)+parseInt(cycleCount)-1;
        //the following four lines only work for NYC contract
        //let cycleRangeRaw = await data.events[1].contract_log.value.repr;
        //const lastCycleStartIndex = await cycleRangeRaw.indexOf('lastCycle')+11;
        //const firstCycle=await cycleRangeRaw.substring(20,cycleRangeRaw.indexOf(')',20));
        //const lastCycle= await cycleRangeRaw.substring(lastCycleStartIndex,cycleRangeRaw.indexOf(')',lastCycleStartIndex));
        const amount=await data.events[0].asset.amount;
        await console.log(Date.now()+" Stacked " + amount + "CityCoins from cycle " + firstCycle + " to " + lastCycle);
        stackingList=await applyStackTokensTransaction(stackingList,amount,firstCycle,lastCycle)
    }
    return stackingList;
}

//Apply stack-tokens transaction to the list
async function applyStackTokensTransaction(stackingList,amount,firstCycle,lastCycle){
    for (let i = firstCycle; i <=lastCycle ; i++) {
        stackingList[i].stackedCoins=parseInt(stackingList[i].stackedCoins)+parseInt(amount);
        stackingList[i].canClaimCoin=
            i==lastCycle || stackingList[i].canClaimCoin=='STX+Coin'
                ?"STX+Coin"
                :"STX Only";
    }
    return stackingList;
}

//Process a claim-stacking-reward transaction, including applying to list
//Currently only checking STX rewards, not coins being returned
async function processClaimTransaction(data,stackingList){
    await console.log(Date.now()+" processClaimTransaction");

    const rewardsCycle=data.contract_call.function_args[0].repr.substring(1);
    const burnBlockTime= data.burn_block_time_iso;
    for (const event of data.events) {
        if (event.event_type==="stx_asset")
        {
            const rewardsAmount= parseInt(event.asset.amount)/1000000;
            stackingList[rewardsCycle].claimedRewards=rewardsAmount;
            stackingList[rewardsCycle].claimDate=burnBlockTime;
            await console.log(Date.now()+" Claimed " + rewardsAmount + "STX from this cycle");
            break;
        }
    }
    return stackingList;
}

//this populates up to three future block end dates, plus any past block end dates which aren't hard coded yet
async function populateFutureBlockEndDates(stackingList)
{
    const currentBlock=await getCurrentBlock();
    const currentDate = new Date().toISOString();
    let ctr=0;
    for (const stackingRound of stackingList.filter(function(item){return (item.endBlockDate=="");}).sort((a) => parseInt(a.endBlock)))
    {
        if (parseInt(stackingRound.endBlock)>parseInt(currentBlock))
        {
            ctr+=1
            let minutestoAdd=await parseInt(stackingRound.endBlock-currentBlock)*10;
            let blockTime=await new Date((new Date(currentDate)).getTime() + (minutestoAdd* 60 * 1000));
            stackingRound.endBlockDate=blockTime;
        }

        
        if (ctr>2)
        {
            break;
        }
    }
}

//Apply stackingList data to the screen
async function applyToScreen(stackingList)
{
    await console.log(Date.now()+" applyToScreen");
    let stopCtr=0;
    let currentBlock=await getCurrentBlock();
    let hasStacking=await toggleNoStacking(stackingList);
    if (!hasStacking)
    {
        return;
    }
    var dateOptions = {year: "numeric", month: "2-digit", day: "2-digit"};
    for (const stackingRound of stackingList)
    {
        if (stackingRound.round==0)
        {
            continue;
        }
        var newRow = await getClonedSampleRow();
        newRow.setAttribute("id","round" + stackingRound.round);
        newRow.classList.add('newrow');
        let isCurrent=currentBlock>=stackingRound.startBlock&& currentBlock<=stackingRound.endBlock;
        let claimDate="";
        if(stackingRound.claimDate!="")
        {
            claimDate=new Date(stackingRound.claimDate).toLocaleString([],{year: "numeric", month: "2-digit", day: "2-digit",hour: "2-digit", minute:"2-digit"});
        }
        let endBlockDate="";
        if(stackingRound.endBlockDate!="")
        {
            endBlockDate=new Date(stackingRound.endBlockDate).toLocaleString([],{year: "numeric", month: "2-digit", day: "2-digit"});
        }
        if (isCurrent)
        {
            newRow.classList.add('currentrow');
        }
        if (stackingRound.claimedRewards==0)
        {
            newRow.querySelector(".claimedrewards").innerHTML='<em>' + stackingRound.canClaimCoin +  '</em>';
        }
        else{
            newRow.querySelector(".claimedrewards").innerText=stackingRound.claimedRewards.toLocaleString("en-US");
        }
        newRow.querySelector(".claimdate").innerText=claimDate;
        newRow.querySelector(".round").innerText="Cycle " + stackingRound.round;
        newRow.querySelector(".startblock").innerText=stackingRound.startBlock;
        newRow.querySelector(".endblock").innerText=stackingRound.endBlock + (endBlockDate==""?"":" (" + endBlockDate + ")");
        newRow.querySelector(".stackedcoins").innerText=stackingRound.stackedCoins.toLocaleString("en-US");
        document.getElementById("stackingSummary").appendChild(newRow);

        let isFuture=currentBlock<stackingRound.startBlock;
        if (stackingRound.stackedCoins==0 && isFuture)
        {
            stopCtr+=1;
            if (stopCtr>2)
            {
                break;
            }
        }
        else
        {
            stopCtr=0;
        }
    }
}

async function toggleNoStacking(stackingList)
{
    let hasStacking=stackingList.some(item=>item.stackedCoins>0);
    if (!hasStacking)
    {
        if (document.getElementById("nostacking").classList.contains('hide'))
        {
            document.getElementById("nostacking").classList.remove('hide')
        }
        if (!document.getElementById("stackinggridheader").classList.contains('hide'))
        {
            document.getElementById("stackinggridheader").classList.add('hide')
        }
    }
    else
    {
        if (!document.getElementById("nostacking").classList.contains('hide'))
        {
            document.getElementById("nostacking").classList.add('hide')
        }
        if (document.getElementById("stackinggridheader").classList.contains('hide'))
        {
            document.getElementById("stackinggridheader").classList.remove('hide')
        }
    }
    return hasStacking;
}

    async function generateNYCStackingList()
    {
        await console.log(Date.now()+" generateNYCStackingList");
        var localStackingList = [
            { round: 0, startBlock: 37449, endBlock: 39548, endBlockDate: "2021-11-28T19:19:59.000Z", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
            { round: 1, startBlock: 39549, endBlock: 41648, endBlockDate: "2021-12-15T22:23:27.000Z", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 2, startBlock: 41649, endBlock: 43748, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 3, startBlock: 43749, endBlock: 45848, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 4, startBlock: 45849, endBlock: 47948, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 5, startBlock: 47949, endBlock: 50048, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 6, startBlock: 50049, endBlock: 52148, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 7, startBlock: 52149, endBlock: 54248, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 8, startBlock: 54249, endBlock: 56348, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 9, startBlock: 56349, endBlock: 58448, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 10, startBlock: 58449, endBlock: 60548, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 11, startBlock: 60549, endBlock: 62648, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 12, startBlock: 62649, endBlock: 64748, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 13, startBlock: 64749, endBlock: 66848, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 14, startBlock: 66849, endBlock: 68948, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 15, startBlock: 68949, endBlock: 71048, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 16, startBlock: 71049, endBlock: 73148, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 17, startBlock: 73149, endBlock: 75248, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 18, startBlock: 75249, endBlock: 77348, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 19, startBlock: 77349, endBlock: 79448, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 20, startBlock: 79449, endBlock: 81548, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 21, startBlock: 81549, endBlock: 83648, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 22, startBlock: 83649, endBlock: 85748, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 23, startBlock: 85749, endBlock: 87848, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 24, startBlock: 87849, endBlock: 89948, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 25, startBlock: 89949, endBlock: 92048, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 26, startBlock: 92049, endBlock: 94148, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 27, startBlock: 94149, endBlock: 96248, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 28, startBlock: 96249, endBlock: 98348, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 29, startBlock: 98349, endBlock: 100448, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 30, startBlock: 100449, endBlock: 102548, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 31, startBlock: 102549, endBlock: 104648, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 32, startBlock: 104649, endBlock: 106748, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 33, startBlock: 106749, endBlock: 108848, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 34, startBlock: 108849, endBlock: 110948, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 35, startBlock: 110949, endBlock: 113048, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 36, startBlock: 113049, endBlock: 115148, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 37, startBlock: 115149, endBlock: 117248, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 38, startBlock: 117249, endBlock: 119348, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 39, startBlock: 119349, endBlock: 121448, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 40, startBlock: 121449, endBlock: 123548, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 41, startBlock: 123549, endBlock: 125648, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 42, startBlock: 125649, endBlock: 127748, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 43, startBlock: 127749, endBlock: 129848, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 44, startBlock: 129849, endBlock: 131948, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 45, startBlock: 131949, endBlock: 134048, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 46, startBlock: 134049, endBlock: 136148, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 47, startBlock: 136149, endBlock: 138248, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 48, startBlock: 138249, endBlock: 140348, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 49, startBlock: 140349, endBlock: 142448, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
			{ round: 50, startBlock: 142449, endBlock: 144548, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  }

        ]; 
        return localStackingList;
    }
async function generateMIAStackingList()
{
    await console.log(Date.now()+" generateMIAStackingList");
    var localStackingList = [
        { round: 0, startBlock: 24497, endBlock: 26596, endBlockDate: "2021-08-20T05:03:09.000Z", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 1, startBlock: 26597, endBlock: 28696, endBlockDate: "2021-09-05T14:52:42.000Z", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 2, startBlock: 28697, endBlock: 30796, endBlockDate: "2021-09-21T22:18:03.000Z", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 3, startBlock: 30797, endBlock: 32896, endBlockDate: "2021-10-07T22:23:47.000Z", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 4, startBlock: 32897, endBlock: 34996, endBlockDate: "2021-10-24T09:22:47.000Z", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 5, startBlock: 34997, endBlock: 37096, endBlockDate: "2021-11-09T02:17:56.000Z", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 6, startBlock: 37097, endBlock: 39196, endBlockDate: "2021-11-25T19:42:21.000Z", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 7, startBlock: 39197, endBlock: 41296, endBlockDate: "2021-12-12T21:11:31.000Z", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 8, startBlock: 41297, endBlock: 43396, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 9, startBlock: 43397, endBlock: 45496, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 10, startBlock: 45497, endBlock: 47596, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 11, startBlock: 47597, endBlock: 49696, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 12, startBlock: 49697, endBlock: 51796, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 13, startBlock: 51797, endBlock: 53896, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 14, startBlock: 53897, endBlock: 55996, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 15, startBlock: 55997, endBlock: 58096, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 16, startBlock: 58097, endBlock: 60196, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 17, startBlock: 60197, endBlock: 62296, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 18, startBlock: 62297, endBlock: 64396, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 19, startBlock: 64397, endBlock: 66496, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 20, startBlock: 66497, endBlock: 68596, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 21, startBlock: 68597, endBlock: 70696, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 22, startBlock: 70697, endBlock: 72796, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 23, startBlock: 72797, endBlock: 74896, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 24, startBlock: 74897, endBlock: 76996, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 25, startBlock: 76997, endBlock: 79096, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 26, startBlock: 79097, endBlock: 81196, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 27, startBlock: 81197, endBlock: 83296, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 28, startBlock: 83297, endBlock: 85396, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 29, startBlock: 85397, endBlock: 87496, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 30, startBlock: 87497, endBlock: 89596, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 31, startBlock: 89597, endBlock: 91696, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 32, startBlock: 91697, endBlock: 93796, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 33, startBlock: 93797, endBlock: 95896, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 34, startBlock: 95897, endBlock: 97996, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 35, startBlock: 97997, endBlock: 100096, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 36, startBlock: 100097, endBlock: 102196, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 37, startBlock: 102197, endBlock: 104296, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 38, startBlock: 104297, endBlock: 106396, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 39, startBlock: 106397, endBlock: 108496, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 40, startBlock: 108497, endBlock: 110596, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 41, startBlock: 110597, endBlock: 112696, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 42, startBlock: 112697, endBlock: 114796, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 43, startBlock: 114797, endBlock: 116896, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 44, startBlock: 116897, endBlock: 118996, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 45, startBlock: 118997, endBlock: 121096, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 46, startBlock: 121097, endBlock: 123196, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 47, startBlock: 123197, endBlock: 125296, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 48, startBlock: 125297, endBlock: 127396, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 49, startBlock: 127397, endBlock: 129496, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 50, startBlock: 129497, endBlock: 131596, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 51, startBlock: 131597, endBlock: 133696, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 52, startBlock: 133697, endBlock: 135796, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 53, startBlock: 135797, endBlock: 137896, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 54, startBlock: 137897, endBlock: 139996, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 55, startBlock: 139997, endBlock: 142096, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 56, startBlock: 142097, endBlock: 144196, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 57, startBlock: 144197, endBlock: 146296, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 58, startBlock: 146297, endBlock: 148396, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 59, startBlock: 148397, endBlock: 150496, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  },
        { round: 60, startBlock: 150497, endBlock: 152596, endBlockDate: "", stackedCoins: 0, claimedRewards: 0, claimDate: "", canClaimCoin: ""  }
        ]; 
    return localStackingList;
}

    async function getClonedSampleRow()
    {
        var sampleRow = document.getElementById("samplerow");
        var clonedRow = sampleRow.cloneNode(true);
        clonedRow.removeAttribute("id");
        clonedRow.removeAttribute("style");
        return clonedRow;
    }

    async function getCurrentBlock(){
        let url = "https://stacks-node-api.mainnet.stacks.co/extended/v1/block?limit=1";
        const response = await fetch(url);
        let json=await response.json();
        return currentBlock=json.results[0].height;

}