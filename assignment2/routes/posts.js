module.exports = {
    getPosts(req, res) {
      console.log(req.info.posts);
      res.status(200).send(req.info.posts);
    },
    addPost(req, res) {
      let newPost = req.body;
      req.info.posts.push(newPost);
      res.status(201).send(req.info.posts);
    },
    updatePost(req, res) {
      let updatePost = req.body;
      Object.assign(req.info.posts[req.params.postId], updatePost);
      res.status(200).send(req.info.posts[req.params.id]);
    },
    removePost(req, res) {
      req.info.posts.splice(req.params.postId, 1);
      res.sendStatus(204); 
    }
  }