const Blog = require( "../models/Blogs");

const getAllBlogs = async ()=>{
    return await Blog.find();
}

const getBlogById = async (id)=>{
    return await Blog.findById(id);
}

const createABlog = async (blog,user)=>{
    return await Blog.create({...blog,author:user});
}

const updateABlog = async (id,uBlog)=>{
    return await Blog.findByIdAndUpdate(id,uBlog,{new:true});
}

const deleteABlog = async (id)=>{
  return await Blog.findByIdAndRemove(id);
}

const createAComment = async (id,comment)=>{
    const blog = await getBlogById(id);
    if(!blog){
        return null;
    }
    blog.comments.push(comment);
    return await blog.save(); 
}

const updateAComment = async (blogId,commentId,comment)=>{
   const blog = await getBlogById(blogId);
   if(!blog){
      return null;
   }
   const comments = blog.comments;
   for(let i=0;i<comments.length;i++){
      if(comments[i]._id.toString()===commentId){
        comments[i].body=comment;
        break;
      }
   }
   blog.comments=comments;
   return await blog.save();
}

const deleteAComment = async (blogId,commentId) =>{
   const blog = await getBlogById(blogId);
    if(!blog){
       return null;
    }
    console.log(commentId)
    blog.comments=blog.comments.filter((comment)=>comment._id.toString()!==commentId)
    const res=await blog.save()
    console.log(res);
    return res;
}

const like = async (id,user)=>{
    const blog = await getBlogById(id);
    if(!blog){
       return null;
    }
    var isPresent = false;
    for(let i=0;i<blog.likedBy.length;i++){
        if(blog.likedBy[i].user===user.username){
            isPresent=true;
            break;
        }
    }
    if(!isPresent){
        blog.likes=blog.likes+1;
        blog.likedBy.push({user:user.username})
    }else{
        blog.likes=blog.likes>0?blog.likes-1:0;
        const nBlog=[]
        for(let i=0;i<blog.likedBy.length;i++){
            if(blog.likedBy[i].user===user.username)
                continue;
            nBlog.push(blog.likedBy[i]);
        }
        blog.likedBy=nBlog;
    }
    return await blog.save();
}

module.exports = {getAllBlogs,createABlog,getBlogById,updateABlog,deleteABlog,createAComment,updateAComment,deleteAComment,like};