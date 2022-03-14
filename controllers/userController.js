const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Authentication Middleware Function
const auth = ( async(req,res,next)=> {
    // Read the JWT access token from the request header
    const key = process.env.USERFRONT_PUBLIC_KEY
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.Status(200).json({message: "Bad token"}); // Return 401 if no token
        try {
            const auth = await jwt.verify(token, key)
            req.auth=auth
            next();
        }   
        catch(error) {
            return res.Status(200).json({message: "Bad token"}); // Return 401 if no token
        }
});

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
});

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