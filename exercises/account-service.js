const sum = require('./utility');
let one = 100;
let two = 200;
let three = 500;
let total = sum([one, two, three]);
console.log(total);
total = sum([one, two]);
console.log(total);

