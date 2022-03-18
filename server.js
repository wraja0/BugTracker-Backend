// Import Dependencie
const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken')
const bCrypt = require('bcrypt')
require('dotenv').config();
const { stringify } = require("nodemon/lib/utils");
// IMPORT MODELS
const db = require('./models/')
// IMPORT ROUTERS
const controllers = require('./controllers');
 // Create our app object
const app = express();
// Set up middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
// AUTHENTICATE LOGIN TOKEN AND STORE LOGIN INFO IN REQ.USER MIDDLEWARE 
const authenticateLoginToken = (req,res, next)=> {
    try {
        const authHeader = req.headers['authorization']
        if (authHeader == null) return res.json('missing authorization header')
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401);
        jwt.verify(token, process.env.SECRET_LOGIN_KEY, async (error, userLoginData)=> {
            if(error) return res.sendStatus(403);
            const foundUser = await db.User.findOne({username: userLoginData.username})
            if (!foundUser) {
                let error = {
                    errortype: 'badusername',
                    invalidLogin: true 
                }
                console.log(error)
                req.errors = error
            }
            else {
                const parsedUserPassword = stringify(userLoginData.password)
                if (await bCrypt.compare(parsedUserPassword,foundUser.password)){
                    console.log('found user authorized sent')
                    req.user= foundUser;
                    req.user.password = '********'
                    next();
                }
                else {
                    let error = {
                        invalidLogin: true,
                        errortype: 'badpassword'
                    }
                    console.log(error)
                    req.errors = error
                }
            }
        })
    }
    catch(error) {
        res.status(400).json(error)
    }
}           
app.use('/user',authenticateLoginToken)
app.use('/user',controllers.User);
// Bug Controller 
app.use('/bugs',authenticateLoginToken)
app.use('/bugs',controllers.Bug);
// BugVH Controller 
app.use('/bugVH',controllers.BugVH);
// Test Controller 
app.use('/tests',authenticateLoginToken)
app.use('/tests',controllers.Test);
// Comment Controller 
app.use('/comments', controllers.Comment);
// Home route for testing our app
app.get("/", (req, res) => {
    res.send("Hello World");
});
// TOKEN GENERATIONS
// LOGINTOKEN
app.post('/generateLoginToken', (req,res, next)=> {
    const user = {
        username:req.body.username,
        password:req.body.password
    }
    const accessToken =jwt.sign(user,process.env.SECRET_LOGIN_KEY)
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
    const accessToken =jwt.sign(user,process.env.SECRET_LOGIN_KEY)
    res.json({accessToken: accessToken})
    next(); 
    }
    catch(error) {
        res.json(error)
    }
})
app.post('/register', async (req,res)=> {
    try {const authHeader = req.headers['authorization']
    if (authHeader == null) return res.json('missing authorization header')
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.SECRET_LOGIN_KEY, async (error, newUserData)=> {
        if (error) { 
            console.log(error)
            res.status(400).res.json(error)
        }
        else {
            const userCreated = await db.User.create(newUserData);
            console.log('A user was just created with the following attributes : ',userCreated);
            res.json(userCreated);
        }
        })
    }
    catch(error) {
        res.status(400).json(error);
    }
    });


// declare a variable for our port number
const PORT = process.env.PORT || 4000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

