const path = require('path');
const express = require('express');
const mongoose = require("mongoose")

const userRoute = require('./routes/user')
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
app.get('/', (req,res) => {
    res.render('home')
})

app.use('/user', userRoute);

app.listen(PORT, ()=> console.log('server started'))