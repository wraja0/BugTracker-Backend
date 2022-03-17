// Import Dependencie
const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken')
const bCrypt = require('bcrypt')
require('dotenv').config();
const db = require('./models')
const controllers = require('./controllers');
const { hash } = require("bcrypt");
 // Create our app object
const app = express();
// Set up middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const authenticateToken = (req,res, next)=> {
    const authHeader = req.headers['authorization']
    if (authHeader == null) return res.json('missing authorization header')
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.SECRET_KEY, (error, data)=> {
        if(error) return res.sendStatus(403);
        req.user = data
        next(); 
    })
}

// User Controller 
// app.use(authenticateToken)
app.use('/user',authenticateToken)
app.use('/user',controllers.User);
// Bug Controller 
app.use('/bugs',authenticateToken)
app.use('/bugs',controllers.Bug);
// BugVH Controller 
app.use('/bugVH',controllers.BugVH);
// Test Controller 
app.use('/tests',authenticateToken)
app.use('/tests',controllers.Test);
// Comment Controller 
app.use('/comments', controllers.Comment);
// Home route for testing our app
app.get("/", (req, res) => {
    res.send("Hello World");
});
// Auth 
// LOGINTOKEN
app.post('/generateLoginToken', (req,res, next)=> {
    const user = {
        username:req.body.username,
        password:req.body.password
    }
    const accessToken =jwt.sign(user,process.env.SECRET_KEY)
    res.json({accessToken: accessToken})
    next();
})
// REGISTERTOKEN
app.post('/generateRegisterToken', async (req,res, next)=> {
    try {
         const hashedPassword = await bCrypt.hash(req.body.password,10)
    const user = {
        username:req.body.username,
        password: hashedPassword,
        class:req.body.class
    }
    const accessToken =jwt.sign(user,process.env.SECRET_KEY)
    res.json({accessToken: accessToken})
    next(); 
    }
    catch(error) {
        res.json(error)
    }
})


// declare a variable for our port number
const PORT = process.env.PORT || 4000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

