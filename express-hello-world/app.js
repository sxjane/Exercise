const express = require('express');
const app = express();

var requestTime = function(req,res,next){
    req.requestTime = Date.now();
    console.log(`${req.method}:
                    ${req.url}`);
    next();
}

app.use(requestTime);

var apiAuthorize = (req, res, next) => {
    if(req.query.api_key){
        next(new Error('oppps'));
    }else{
        res.status(401).send('Not authorized');
    }
}

app.get('/', (req,res) => {
    var responseText = 'Hello World!<br>';
    responseText += '<small>Requested at: ' + req.requestTime + '</small>'
    res.send(responseText);
});

app.get('/accounts', apiAuthorize, (req,res) => {
    res.send("<h1>Hello Jane</h1>");
})

app.use((error, req, res, next) => {
    res.status(500).send(error);
})

app.listen(3000);
