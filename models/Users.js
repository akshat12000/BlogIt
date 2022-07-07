const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");

const userSchema = new mongoose.Schema({
    name:{type:String},
    username:{type:String},
    password:{type:String},
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("Users",userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = User;