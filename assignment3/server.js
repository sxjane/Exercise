const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const assert = require('assert');
const path = require('path');

const app = express();
const mongoClient = mongodb.MongoClient;
const baseUrl = 'http://localhost';
const dbUrl = 'mongodb://localhost:27017'
const dbName = 'assignment3';
const firstCollection = 'first-collection'
const secondCollection = 'second-collection'
const baseRoute = '/accounts';
const idRoute = baseRoute + '/:id';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(errorHandler());

mongoClient.connect(dbUrl, { useNewUrlParser: true }, (err, client) => {
    assert.equal(err, null);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection(firstCollection);
    

    app.get('/', (req,res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
        
    })
    app.get(baseRoute, (req, res) => {
        collection.find({}, {sort: {_id: 1}}).project({"lastname": 1, "firstname": 1, "_id": 0}).toArray((err, docs) => {
            assert.equal(err, null);
            res.send(docs[0].lastname);
        })
    });

    app.post(baseRoute, (req, res) => {
        console.log(req.body);
        collection.insertOne(req.body, (err, result) => {
            assert.equal(err, null);
            res.json({'the number of updated documents': result.result.n});
        })
    })

    app.delete(idRoute, (req,res) => {
        collection.deleteOne({_id: mongodb.ObjectID(req.params.id)}, (err, result)=>{
            assert.equal(err, null);
            res.json({'the number of deleted documents': result.result.n})
        })
    })

    app.put(idRoute, (req, res) => {
        collection.update({_id: mongodb.ObjectID(req.params.id)},{$set:req.body}, (err, result)=>{
            assert.equal(err, null);
            res.json({'the number of updated documents': result.result.n});
        })
    })
})

app.listen(3001);


