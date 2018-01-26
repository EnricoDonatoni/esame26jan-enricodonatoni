
const express = require('express'),
    bodyParser = require('body-parser');

var modulo = require("./checker.js");


const app = express();
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 5000));

// a useless function that returns a fixed object. you can use it, if you want, for testing purposes
app.get('/count',function (req, res) {
    res.json({count: 5})
})

app.post('/check',function (req, res) {
	
	var url = req.body.url || req.query.url;
	var invocationParameters = req.body.invocationParameters || req.query.invocationParameters;
	var expectedResultData = req.body.expectedResultData || req.query.expectedResultData;
	var expectedResultStatus = req.body.expectedResultStatus || req.query.expectedResultStatus;


    res.json({res: modulo.check(url, invocationParameters, expectedResultData, expectedResultStatus)});
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
