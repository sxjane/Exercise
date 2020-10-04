
console.log('helllo');
module.exports = function(numbersToSum){
    let sum = 0, i = 0, j = numbersToSum.length;
    while(i<j){
        sum += numbersToSum[i];
        i++;
    }
    return sum;
}