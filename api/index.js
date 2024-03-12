const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;


const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize());
const jwt = require('jsonwebtoken');

mongoose.connect(
    "mongodb+srv://truongphandinhtruc:Minecraft2310@cluster0.ywmtbdy.mongodb.net/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => {
    console.log("Connected to Mongo Db");
}).catch((error)=>{
    console.log("Error to connecting to MongoDb", error);
})

app.listen(port, () => {
    console.log("Server running on port 8000");
})