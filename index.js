require("dotenv").config()
const express = require("express");
const blogRouter = require("./routes/blogRoutes");
const session = require("express-session");
const passport = require("passport");
const authRouter = require("./routes/authRoutes");
const PORT = process.env.PORT || 5000
const path= require("path");
const app = express();

app.use(express.json())

app.use(session({
    secret:process.env.PASSPORT_SECRET,
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

require("./database/dbconn.js");
require("./models/Users");

app.use("/user",authRouter);
app.use("/blogs",blogRouter);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT,()=>{
    console.log("Server is running at port 5000")
})