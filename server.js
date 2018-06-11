var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// mongoose.connect('mongodb://localhost/spacebookDB', function() {
//   console.log("DB connection established!!!");
// })

mongoose.connect('mongodb://localhost/spacebookDB', { useMongoClient: true }, function () {
  console.log("DB connection established!!!");
})

var Post = require('./models/postModel');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// we created 5 server routes
// These define our API:

// 1) to handle getting all posts and their comments
app.get('/posts', (req, res) => {
  // reads the data of posts from the db and send it as a respone to the client
  Post.find(function (error, posts) {
    if (error)
      // return console.error(error);
      throw error;
    console.log(posts); //log here in the console all the posts
    res.send(posts);
  });
});

// 2) to handle adding a post
//When requested by a client, the route needs to take the data supplied by the client and from it create a new post.
app.post('/posts', (req, res) => {
  var newPostDB = new Post(req.body);
  newPostDB.save((err, post) => {
    if (err)
      throw err;
    res.send(newPostDB);
  });
});


// 3) to handle deleting a post
//Once the server has deleted the post it should notify the client
app.delete('/posts/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err)
      // return console.error(err);
      throw err;
    res.send('post removed successfully');
  });
})

// 4) to handle adding a comment to a post
app.post('/posts/:idPost/comments', (req, res) => {
  Post.findByIdAndUpdate(req.params.idPost, { $push: { comments: req.body } }, { new: true }, (err, updatedPost) => {
    if (err)
      throw err;
    res.send(updatedPost);
  });
});

// 5) to handle deleting a comment from a post
app.delete('/posts/:idPost/comments/:idComment', (req, res) => {
  Post.findByIdAndUpdate(req.params.idPost, { $pull: { comments: { _id: req.params.idComment } } }, { new: true }, (err, updatedPost) => {
    if (err)
      throw err;
    res.send('comment removed successfully');
  });
});

/*=====================================================
optional
=======================================================*/
// 6)  to handle editing a post
app.put('/posts/:postId', (req, res) => {
  var id = req.params.postId;
  // update the text of post in the DB collection
  Post.findByIdAndUpdate(id, { $set: { text: req.body.text } }, { new: true }, (err, updatedPost) => {
    if (err)
      throw err;
    console.log(updatedPost);
    res.send(updatedPost);
  });
});



//PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}...`));