var mongoose = require('mongoose');

//design the two schema below and use sub docs
//to define the relationship between posts and comments


let commentSchema = new mongoose.Schema({
text: String,
user: String,
createDate: String  // maybe instead do this - i will put the date in the array in ajax in succsess handler
});


let postSchema = new mongoose.Schema({
text: String,
comments: [commentSchema]
});

let Post = mongoose.model('post', postSchema)

module.exports = Post;

