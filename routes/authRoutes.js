const express = require("express");
const passport = require("passport");
const User = require("../models/Users");
const authRouter = express.Router();

authRouter.get("/",(req,res)=>{
    if(req.isAuthenticated()){
        res.status(200).send(req.user);
    }else{
        res.status(401).send("Unauthorized");
    }
})

authRouter.post("/register",(req,res)=>{
    User.register({username:req.body.username,name:req.body.name},req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            res.status(400).send(err);
        }else{
            passport.authenticate("local")(req,res,()=>{
                res.status(200).send(req.user)
            })
        }
    })
})

authRouter.post("/login",(req,res)=>{
    const user = new User({
        username:req.body.username,
        password:req.body.password
    })
    req.logIn(user,(err)=>{
        if(err){
            console.log(err);
            res.status(400).send(err);
        }else{
            passport.authenticate("local")(req,res,()=>{
                res.status(200).send(req.user)
            })
        }
    })
})

authRouter.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(!err){
            res.status(200).send("Logout Successful!");
        }else{
            res.status(400).send(err);
        }
    });
})

module.exports = authRouter;