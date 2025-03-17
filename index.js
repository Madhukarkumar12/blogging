const path = require('path');
const express = require('express');
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')

const Blog = require('./models/blog');

const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const app = express();

// y1KxcA8aCzlIu5v4
// madhukarkumar26072001
const PORT = 8000;

mongoose 
  .connect("mongodb+srv://madhukarkumar26072001:y1KxcA8aCzlIu5v4@cluster0.g0fzh.mongodb.net/")
  .then((e)=> console.log("MongoDB connected...."))

app.set('view engine', 'ejs');
app.set('views',path.resolve("./views"));

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));

app.get('/', async(req,res) => {
    const allBlogs = await Blog.find({}).sort({createdAt: -1}).populate('createdBy');
    res.render('home', {
      user: req.user,
      blogs: allBlogs,
    })
})

app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(PORT, ()=> console.log('server started'))