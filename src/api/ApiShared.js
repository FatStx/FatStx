
//Fully process one call to an API which returns json
export default async function processOneApiPage(url) {
    console.log(`${Date.now()}===Process Api Page: ${url}`);
    const response = await fetch(url).catch(error =>
        {
            console.log("Error Fetching API Information",url);
        });
        console.log(1);
    let json = null;
    let responseStatus=500;
    if (response !== undefined) {
        responseStatus=response.status;
        if (responseStatus === 200) {
            json = await response.json();
        }
    } 
    const returnArray=[responseStatus, json];
    return returnArray;
}
