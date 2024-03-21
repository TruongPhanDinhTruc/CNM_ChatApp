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

const User = require('./models/user');
const Message = require('./models/message');

//Dang ky

app.post("/register", (req, res)=>{
    const {name, email, password, image} = req.body;

    const newUser = new User({name, email, password, image});

    newUser.save().then(()=>{
        res.status(200).json({message: "User register successfully"})
    }).catch((error)=>{
        console.log("Error registering user", error);
        res.status(500).json({message: "Error registering the user"})
    });
});

//Tao token cho user
// const createToken = (userId) => {
//     const payload = {
//         userId: userId,
//     };


// }

//Dang nhap
app.post("./login", (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(404).json({message: "Email and the password are required"});
    }

    User.findOne({email}).then((user) => {
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        const token = createToken(user._id);
        res.status(200).json({token});
    }).catch((error) => {
        console.log("Error in finding the user", error);
        res.status(500).json({message: "Internal server Error"});
    })
})