import processOneApiPage from '../api/ApiShared'

export async function getLatestBitcoinBlock() {
    //const url = 'https://blockchain.info/latestblock';
    const url = 'https://api.blockcypher.com/v1/btc/main';
    //SOURCE:https://explorer.btc.com/btc/adapter?type=api-doc
    //const url = 'https://chain.api.btc.com/v3/block/latest/tx?verbose=1'
    const res = await processOneApiPage(url);
    if (res[0] === 200) {
        console.log(res[1].height);
        //return res[1].data.height;
        return res[1].height;
        //const blockHeight=res[1].data["list"][0].block_height;
        //return blockHeight;
    }
    return null;
}

export async function getBitcoinBlockTimes(blockList) {
    //SOURCE:https://explorer.btc.com/btc/adapter?type=api-doc
    const url = `https://chain.api.btc.com/v3/block/${blockList}`
    const res = await processOneApiPage(url);
    if (res[0] === 200) {
        let theDates=[];
        if (!Array.isArray(res[1].data))
        {
            theDates.push({height: res[1].data.height, timestamp: res[1].data.timestamp});
        } else {
            for (const block of res[1].data) {
                theDates.push({height: block.height, timestamp: block.timestamp});
            }
        }
        return theDates;
    }
    return null;
}