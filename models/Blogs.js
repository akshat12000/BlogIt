const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:  {type:String,required:true},
    author: {type:Object,required:true},
    body:   {type:String,required:true},
    comments: [{ body: String, user:Object, date: Date }],
    date: { type: Date, default: Date.now },
    likes: {type:Number,default:0},
    likedBy:[{user:String}]
})

const Blog = mongoose.model("Blogs",blogSchema);

module.exports = Blog;