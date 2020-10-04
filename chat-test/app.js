npmvar app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var morgan = require('morgan');

server.listen(4000);

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(morgan('dev'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
})

var groups=['G1','G2', 'G3', 'G4', 'G5', 'G6','G7','G8'];
var index = 0;
var numberOfGroups = process.argv[2];
console.log(numberOfGroups);

app.post('/go-chat', function(req, res) {
    obj = {
        name: req.body.name,
    }
    if(index >= numberOfGroups){
        index = 0;
    }
    obj.group = groups[index];
    index++;

    res.send(JSON.stringify(obj));
});

var chat = [];
for(let i = 0; i < numberOfGroups; i++){
    chat.push(io.of(groups[i]));
    chat[i].on('connection',(socket)=>{
        console.log('connected' + i);
        socket.emit('start', 'Start!');
        socket.on('a message', (data) => {
            chat[i].emit('room', data);
        })
    })  
}


        

