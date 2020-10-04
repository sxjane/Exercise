/*const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgen = require('morgan');

app.use(bodyParser.json());
app.use(morgen('dev'));

app.get('/', (req,res) => {
    res.send({msg: "Hello World!"});
});

app.post('/transaction', (req,res) => {
    console.log(req.body);
    res.send({msg: 'transactions'});
});

app.listen(3000);*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator/check');

app.use(bodyParser.json());

let profile = [{
    username: 'azat',
    email: '[reducted]',
    url: 'http://azat.co'
},{ username: 'Ada',
    email: 'sxj.jane@gmail.com',
    url: 'http://wechat.com'
}, {username: 'Sophie',
    email: 's@yahoo.com',
}];

app.get('/profile', (req, res) => {
    if(req.query.id){
        return res.send(profile[req.query.id]);
    }
    res.send(profile);
});

app.post('/profile',check('email').isEmail(), (req, res) => {
    if(!req.body.firstname || !req.body.lastname|| !req.body.email){
        return res.sendStatus(404);
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
    let obj = {
        username: req.body.firstname + " " + req.body.lastname,
        email: req.body.email,
    };

    profile.push(obj);
    console.log('created', profile);
    res.sendStatus(201);
});

app.put('/profile/:id', (req, res) => {
    Object.assign(profile[req.params.id], req.body);
    console.log('updated', profile[req.params.id]);
    res.sendStatus(204);
});

app.delete('/profile/:id', (req, res) => {
    console.log(`The deleted Id is ${req.params.id}`);
    profile.splice(req.params.id, 1);
    console.log('deleted', profile);
    res.sendStatus(204);
});

app.listen(3000);