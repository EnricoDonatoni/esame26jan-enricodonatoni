
const fetch = require('node-fetch')

exports.check = function (url, invocationParameters,  expectedResultData, expectedResultStatus) {

    //formulo l'url per la richiesta
    //non riesco a definire Request e Headers
    /*var richiesta = new Request(url, {
               method: "get",
               headers: new Headers({
                  "Content-Type": "application/json"
               }),
               query: JSON.stringify({
                  parameters: Object.keys(invocationParameters)
               })
            });*/

    //elaboro la richiesta fetch
    rispostaFetch = fetch(url).then(response => {
               if (response.ok) {
                    console.log("Contenuto ricevuto");
                    return response.json;
               }
               if (response.status >= 100 && response.status < 200) {
                  console.log("Informazioni per il client");
               }
               if (response.status >= 300 && response.status < 399) {
                  console.log("Redirezione");
               }
               if (response.status >= 400 && response.status < 499) {
                  console.log("Richiesta errata");
               }
               if (response.status >= 500 && response.status < 599) {
                  console.log("Errore sul server");
               }
            }).catch(error => console.log("Si è verificato un errore!"));

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

};


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
