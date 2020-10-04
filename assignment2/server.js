const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

let store = {
    posts: [
      {name: 'Top 10 ES6 Features every Web Developer must know',
      url: 'https://webapplog.com/es6',
      text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
      comments: [
        {text: 'Cruel…..var { house, mouse} = No type optimization at all'},
        {text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.'},
        {text: '(p1,p2)=>{ … } ,i understand this ,thank you !'}
      ]
      }
    ]
  }

app.use(bodyParser.json());
app.use(logger('dev'));
app.use((req, res, next) => {
    req.info = store;
    next();
})

app.get('/posts', routes.posts.getPosts);

app.post('/posts', routes.posts.addPost);

app.put('/posts/:postId', routes.posts.updatePost);

app.delete('/posts/:postId', routes.posts.removePost);

app.get('/posts/:postId/comments', routes.comments.getComments);

app.post( '/posts/:postId/comments', routes.comments.addComments);

app.put('/posts/:postId/comments/:commentsId', routes.comments.updateComments);

app.delete('/posts/:postId/comments/:commentsId',routes.comments.removeComments);

app.listen(3000);
