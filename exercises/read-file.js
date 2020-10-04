const fs = require("fs");
const path = require("path");
fs.readFile(path.join(__dirname, 'message.txt'),'utf-8',(err,data)=>{
    if(err) return console.error(error);
    console.log(data);
});