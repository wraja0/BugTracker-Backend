const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");

//Authentication Middlware
function authenticateToken(req, res, next) {
  // Read the JWT access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // Return 401 if no token

  // Verify the token using the Userfront public key
  jwt.verify(token, process.env.USERFRONT_PUBLIC_KEY, (err, auth) => {
    if (err) return res.sendStatus(403); // Return 403 if there is an error verifying
    req.auth = auth;
    next();
  });
}

// Authentication Middleware Call
router.use(authenticateToken)

// QuerybyUserID handler
router.get('/', async (req,res, next)=> {
    try {
        const allUsers = await User.find({});
        console.log(allUsers);
        res.json(allUsers)
        next();
    }
    catch(error) {
        res.status(400).json(error);
        next();
    }
})

router.get('/:query', async (req, res)=> {
    try {
        const userQued = await User.findById(req.params.query);
        console.log ('A user was fetched with the following attributes :',userQued);
        res.json(userQued);
    }
    catch (error) {
        res.status(400).json(error);
    }
});

// Create User Handler 
router.post('/create', async (req,res)=> {
    try {
        const userCreated = await User.create(req.body);
        console.log('A user was just created with the following attributes : ',userCreated);
        res.json(userCreated);
    }
    catch(error) {
        res.status(400).json(error);
    }
});
router.put('/:id/update', async (req,res)=> {
    try {
        const userWarped = await User.findByIdAndUpdate(req.params.id,req.body);
        console.log('A user has been updated with the following attributes : ',userWarped);
        res.json(userWarped);
    }
    catch(error) {
        res.status(400).json(error);
    }
});
router.delete('/:id/delete', async (req,res)=> {
    try {
        const userDelted = await User.findByIdAndDelete(req.params.id);
        console.log ('A user has been deleted with the following attributes : ', userDelted);
        res.json(userDelted);
    }
    catch(error) {
        res.status(400).json(error);
    }
});
module.exports = router;