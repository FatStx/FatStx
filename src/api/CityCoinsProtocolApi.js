import processOneApiPage from '../api/ApiShared'

//Return 0 if not found
export async function getUserIdForPrincipal(principalId) {
    let baseUrl = "https://protocol.citycoins.co/api/ccd003-user-registry/get-user-id?user=" + principalId;
    let ret = await processOneApiPage(baseUrl);
    if (ret[0] === 200) {
        return ret[1];
    } else if (ret[0] === 404) {
        return 0;
    }
    return null;
}

export async function getStackerForUserId(cityId,cycle,userId) {
    let baseUrl = `https://protocol.citycoins.co/api/ccd007-citycoin-stacking/get-stacker?cityId=${cityId}&cycle=${cycle}&userId=${userId}`
    let ret = await processOneApiPage(baseUrl);
    if (ret[0] === 200)
    {
        return ret[1];
    }
    return null;
}
