const csv = require('csvtojson');
const request = require('request');
const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname, 'customer-data.csv');

const readStream = fs.createReadStream(filename);
const outStream = fs.createWriteStream('solution5-output.json');

readStream.pipe(csv()).pipe(outStream);