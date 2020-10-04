const fs = require('fs');
const path = require('path');
const Csv2json = require ("csvtojson/v1").Converter;

var converter = new Csv2json({constructResult:false, toArrayString:true});

// var readingData = fs.readFile(path.join(__dirname, "./customer-data.csv"), function (error, data) {
//   if (error) return console.log(error)
//   return data;
// });
// var writeData = fs.writeFile(path.join(__dirname, "./customers.json"));
var dataStreamIn = fs.createReadStream("customer-data.csv");
var dataStreamOut = fs.createWriteStream("customer-data.json");


dataStreamIn.pipe(converter).pipe(dataStreamOut);