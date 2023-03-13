import processOneApiPage from '../api/ApiShared'

export async function getLatestBitcoinBlock() {
    const url = 'https://blockchain.info/latestblock';
    const res = await processOneApiPage(url);
    if (res[0] === 200) {
        return res[1].data.height;
    }
    return null;
}