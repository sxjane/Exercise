const path = require('path');
const filename = path.join(__dirname, 'customer-data.csv');
const csv = require('csvtojson');
const fs = require('fs');

csv().fromFile(filename).then((jsonObj) => {
   fs.writeFile('output.json', JSON.stringify(jsonObj), (err) => {
       if(err){
           throw err;
       }
       console.log("The file has been saved.");
   });
});
