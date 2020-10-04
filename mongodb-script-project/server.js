const mongodb = require('mongodb');
const assert =require('assert');

const url = "mongodb://localhost:27017";
const dbname = "myproject";
const collection_name = 'edx-course-students';
mongodb.connect(url, { useNewUrlParser: true }, (err, client) => {
    assert.equal(err, null);
    console.log("Connected successfully");

    const db = client.db(dbname);
    /*(insertDocuments(db, ()=> {
        findDocuments(db, ()=> {
            client.close();
        })
    })*/

   /* updateDocuments(db, ()=>{
        client.close();
    })*/

    removeDocuments(db, (result)=>{
        console.log("The number of deleted data is " + result.result.n);
        client.close();
    })
   
})

function insertDocuments(db, callback){
    collection = db.collection(collection_name);
    collection.insertMany([{name:"Ada"},{name:"Peter"},{name:"Lili"}, {name:"YYY"}],(err,result) =>{
        //assert.equal(err, null);
        console.log(result.result.n);
        console.log(result.ops.length);
        callback(result);
    } )
}

function findDocuments(db, callback){
    const collection = db.collection(collection_name);
    collection.find({'name':'Ada'}).toArray((err, docs) => {
        console.log("Found data");
        console.log(docs);
        callback(docs);
    })
} 

function updateDocuments(db, callback){
    const collection = db.collection(collection_name);
    collection.updateMany({'name':'Ada'}, {$set: {'home': 'hhhh'}}, (err, result) => {
        console.log("The number of updated data : " + result.result.n);
        callback(result);
    })
}

function removeDocuments(db, callback){
    const collection = db.collection(collection_name);
    collection.deleteMany({'name': 'Ada'}, (err, result) => {
        callback(result);
    })
}