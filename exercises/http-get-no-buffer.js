const http = require('https');
const url = 'https://gist.githubusercontent.com/azat-co/a3b93807d89fd5f98ba7829f0557e266/raw/43adc16c256ec52264c2d0bc0251369faf02a3e2/gistfile1.txt';

let get = http.get(url, (response) => {
    let rawData = '';
    response.on('data', (chunk) => {
        console.log('data is receving');
        rawData += chunk;
    });
    response.on('end', () => {
       try {
           const parsedData = JSON.parse(rawData);
           console.log('http data');
           console.log(parsedData);
       } catch (e) {
           console.error(e.message);
       }
    });
});

get.on('error', (error) => {
    console.error(`Got error: ${error.message}`);
  });

console.log('I am here');
