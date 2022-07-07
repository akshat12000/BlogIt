const express = require("express");
const { getAllBlogs, createABlog, getBlogById, updateABlog, deleteABlog, createAComment, updateAComment, deleteAComment, like } = require("../controllers/blogsController");
const blogRouter = express.Router();

// Blogs Route

// Get All Blogs
blogRouter.get("/",async (req,res)=>{
    if(req.isAuthenticated()){
        var result=await getAllBlogs();
        res.send(result)
    }else{
        res.status(401).send("Unauthorized")
    }
})

// Get One Blog By Id
blogRouter.get("/:id",async (req,res)=>{
    if(req.isAuthenticated()){
        var result = await getBlogById(req.params.id);
        if(result){
            res.status(200).send(result)
        }else{
            res.status(400).send("No Response")
        }
    }else{
        res.status(401).send("Unauthorized")
    }
})

// Create A Blog
blogRouter.post("/create",async (req,res)=>{
    if(req.isAuthenticated()){
        var result = await createABlog(req.body,req.user);
        if(result){
            res.status(201).send("Blog Created Successfully!")
        }else{
            res.status(400).send("No Response")
        }
    }else{
        res.status(401).send("Unauthorized");
    }
})

// Update A Blog
blogRouter.put("/update/:id",async (req,res)=>{
    if(req.isAuthenticated()){
        var result = await updateABlog(req.params.id,req.body);
        if(result){
            res.status(200).send("Blog Updated Successfully!")
        }else{
            res.status(400).send("No Response")
        }
    }else{
        res.status(401).send("Unauthorized")
    }
})

// Delete A Blog
blogRouter.delete("/delete/:id",async (req,res)=>{
    if(req.isAuthenticated()){
        var result = await deleteABlog(req.params.id);
        if(result){
            res.status(200).send("Blog Deleted Successfully!")
        }else{
            res.status(400).send("No Response")
        }
    }else{
        res.status(401).send("Unauthorized")
    }
})

// Blog Comments

// Create A Comment
blogRouter.post("/comments/create/:id",async (req,res)=>{
    if(req.isAuthenticated()){
        const comment = {body:req.body.body,user:req.user,date:Date.now()}
        var result = await createAComment(req.params.id,comment);
        if(result){
            res.status(200).send("Comment Added Successfully!")
        }else{
            res.status(400).send("No Response")
        }
    }else{
        res.status(401).send("Unauthorized")
    }
})

// Update A Comment
blogRouter.put("/comments/update/:blogId/:commentId",async (req,res)=>{
    if(req.isAuthenticated()){
        const comment = req.body.body;
        var result = await updateAComment(req.params.blogId,req.params.commentId,comment);
        if(result){
            res.status(200).send("Comment Updated Successfully!")
        }else{
            res.status(400).send("No Response")
        }
    }else{
        res.status(401).send("Unauthorized")
    }
})

// Delete A Comment
blogRouter.delete("/comments/delete/:blogId/:commentId",async (req,res)=>{
    if(req.isAuthenticated()){
        var result = await deleteAComment(req.params.blogId,req.params.commentId);
        if(result){
            res.status(200).send("Comment Deleted Successfully!")
        }else{
            res.status(400).send("No Response")
        }
    }else{
        res.status(401).send("Unauthorized")
    }
})

// Like Count

// Increase or Decrease Like Count
blogRouter.put("/like/:id",async (req,res)=>{
    if(req.isAuthenticated()){
        var result = like(req.params.id,req.user);
        if(result){
            res.status(200).send("Reacted to the post!")
        }else{
            res.status(400).send("No Response")
        }
    }else{
        res.status(401).send("Unauthorized")
    }
})

module.exports = blogRouter;