const fs = require('fs');
const https = require('https');
let urlF = 'https://prod-edxapp.edx-cdn.org/assets/courseware/v1/07d100219da1a726dad5eddb090fa215/asset-v1:Microsoft+DEV283x+2T2018+type@asset+block/customer-data.csv'
const path = require('path');
const desFile = path.join(__dirname, 'solution3-output.json');
let isHeader = false;

const fetchData = (url, callback) => {
    https.get(url, (res) => {
        res.setEncoding('utf8');
        let buff = "";
        let lines;
        let header = [];

        res.on('data', (chunk) => {
            buff +=chunk;
            lines = buff.split('\n');
            if(buff.endsWith('\n')){
               buff = "";
            }else{
                buff = lines[lines.length - 1];
                lines.splice(lines.length - 1);
            }
            if(!isHeader){
                isHeader = true;
                header = lines[0].split(',');
                lines.splice(0,1);
            }
            lines = lines.filter((line) => {
                return !!lines;
            });
        });

        res.on('end', ()=>{
            console.log("All data are received");
            fs.readFile(desFile, (err,data) => {
                if(err) throw err;
                console.log("The length of data is " + data.length);
            });
        });
    }).on('error', (e)=>{
        console.log(e);
    });
}

fetchData(urlF, (data, desPath) => {
    fs.appendFileSync(desPath, data);
});