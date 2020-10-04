function Say(words,saySomething){
    saySomething(words);
}

function sayEnglish(words){
    console.log("Hello " + words);
}

Say("World", (words) => {
    console.log("Hello " + words);
});