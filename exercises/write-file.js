const fs = require("fs");
fs.writeFile('message.txt', "hello, new step! I am Jane.", (err)=>{
    if(err) throw err;
    console.log("This file has been saved");
});

