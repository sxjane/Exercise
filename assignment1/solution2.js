const https = require('https');
const fs = require('fs');
const path = require('path');
let url = "https://prod-edxapp.edx-cdn.org/assets/courseware/v1/07d100219da1a726dad5eddb090fa215/asset-v1:Microsoft+DEV283x+2T2018+type@asset+block/customer-data.csv";

let hasheader = false;
let jsonFilename = path.join(__dirname, 'csv_to_json_output.json');

https.get(url, (response) => {
    let buf = "";
    let header = [];

    response.on('data', (chunk) => {
        buf += chunk;
        lines = buf.split('\n');
        if (buf.endsWith('\n')) {
            // clear the buffer if the line was complete
            buf = "";
        }
        else {
            // the last line is incomplete. preseve the data in 'buf'
            buf = lines[lines.length - 1];
            lines.splice(lines.length - 1);
        }

        if (!hasheader) {
            // the very first line is the header
            hasheader = true;
            header = lines[0].split(',');
            lines.splice(0,1);
        }

        // filter empty array elements. (usually the last line was empty, maybe because double \n)
        lines = lines.filter((line) => {
            return !!line;
        });

        let output=lines.map(line => {
            let json = {};

            let cols = line.split(',');
            for (var c = 0; c < cols.length; c++) {
                json[header[c]] = cols[c];
            }
            return json;
        });

        // write each chunk to file        
        fs.appendFileSync(jsonFilename, JSON.stringify(output), 'utf-8');
    });
    response.on('end', () => {
        console.log('conversion complete. json file saved as ' + jsonFilename);
    });

}).on('error', (err) => {
    console.log("Error: ${err.message}");
});