const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');

const app = express();

let store = {};
store.accounts = [];

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorHandler());


function logAccounts(status){    
    console.log(status)
    console.log("The length of accounts is " + store.accounts.length + ".");
    store.accounts.forEach(element => {
        console.log(element);
    });
    console.log("************")
}

app.get('/accounts', (req, res) => {
    res.status(200).send(store.accounts);
    logAccounts("app.get");
});

app.post('/accounts', (req, res) => {
    let newAccount = req.body;
    let id = store.accounts.length;
    store.accounts.push(newAccount);
    res.status(201).send({id: id});
    logAccounts("app.post");
});

app.put('/accounts/:id', (req, res) => {
    store.accounts[req.params.id] = req.body;
    res.status(200).send(store.accounts[req.params.id]);
    logAccounts("app.put");
});

app.delete('/accounts/:id', (req, res) => {
    store.accounts.splice(req.params.id, 1);
    res.status(204).send()
    logAccounts("app.delete");
});

app.listen(3000)