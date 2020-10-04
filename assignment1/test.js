/*var arrayData = ['Jane', 'Female', "31", "Student"];
var arrayHeader = ['Name', "Gender", "Age", "Occupation"];

var obj = {};

const fs = require('fs');
let rawData = fs.readFileSync("rawdata.json");
let student = JSON.parse(rawData);
//console.log(student.name);
//console.log(rawData);

let jsonData = require('./rawdata.json');
console.log(jsonData);*/

/*const fs = require('fs');
let student = {
    name: 'Mike',
    age: 23,
    gender: 'Male',
    department: 'English',
    car: 'Honda'
};
let data = JSON.stringify(student, null, 2);
fs.writeFileSync('student-test.json', data);*/

const http = require('http');
const port = 300;
http.createServer((request,response) => {
    response.writeHead(200,{'Content-Type' : 'text/plain'});
    response.end('ok');
    
}).listen(port);