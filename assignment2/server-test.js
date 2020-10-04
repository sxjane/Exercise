const a = require('./exports-test')

a.emitter.on('ready',() => {
    console.log("a is ready");
})
