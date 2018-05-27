var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const SERVER_PORT = 8080;

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

//*adding some dummy data to the "posts" collection in a database called "spacebookDB"*//
// var post_1= new Post({text:'my first post!', comments:[{text:"comment 1 !", user:"hodaya"}]});
// post_1.save();
// var post_2= new Post({text:'my second post!', comments:[{text:"comment 1 !!", user:"roni"}, {text:"comment 2 !!", user:"adi"}]});
// post_2.save();

// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
app.get('/posts', (req, res) => {
  // reads the data of posts from the db and send it as a respone to the client
  Post.find(function (error, posts) {
    if (error)
      return console.error(error);
    console.log(posts); //log here in the console
    res.send(posts);
  });
});

// 2) to handle adding a post
//When requested by a client, the route needs to take the data supplied by the client and from it create a new post.
app.post('/posts', (req, res) => {
  console.log('in app.post:');
  var newPost = new Post(req.body);
  console.log(newPost);
  newPost.save();
  res.send(newPost);
});


// 3) to handle deleting a post
//Once the server has deleted the post it should notify the client
app.delete('/posts/:id', (req, res) => {
  console.log(req.params.id);
  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err)
      return console.error(err);
    res.send('remove successfully');
  });
})

// 4) to handle adding a comment to a post


// 5) to handle deleting a comment from a post





app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});
