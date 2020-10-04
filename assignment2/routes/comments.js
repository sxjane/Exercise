module.exports = {
    getComments(req, res){
       res.status(200).send(req.info.posts[req.params.postId].comments);
    },
    addComments(req, res){
        let desComments = req.info.posts[req.params.postId].comments;
        desComments.push(req.body);
        res.status(201).send(desComments);
    },
    updateComments(req, res){
        let desComments = req.info.posts[req.params.postId].comments;
        Object.assign(desComments[req.params.commentsId], req.body);
        res.status(200).send(desComments);
    },
    removeComments(req, res){
        let desComments = req.info.posts[req.params.postId].comments;
        desComments.splice(req.params.commentsId, 1);
        res.status(200).send(desComments);
    }
}