
const fetch = require('node-fetch')

function check(url, invocationParameters,  expectedResultData, expectedResultStatus) {

    rispostaFetch = (logfetch(url, { method: "get" })
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
                // Here you get the data to modify as you please
                let authors = data.results; // Get the results
                return authors.map(function(author) { // Map through the results and for each run the code below
                    console.log(author);
                })
            })
            .catch( error => console.error(error) );); // If there is any error you will catch them here

    //rispostaFetch dovrebbe essere un json

    var resultData = rispostaFetch.resultData;
    var resultStatus = rispostaFetch.resultStatus;
    var statusTestPassed = compareResults(expectedResultStatus,resultStatus);
    var resultDataAsExpected = compareResults(expectedResultData, resultData);

    const checkResult = { // this is the object you need to set and return
        urlChecked: url,
        resultData: resultData,
        resultStatus: resultStatus,
        statusTestPassed: statusTestPassed,
        resultDataAsExpected: resultDataAsExpected
    }

    return checkResult;



}


// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (let e of Object.keys(expected)) {
        if (actual[e]===undefined || expected[e]!=actual[e]  ) return false
    }
    return true
}

module.exports = check