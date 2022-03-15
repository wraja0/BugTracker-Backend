const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const key = process.env.USERFRONT_PUBLIC_KEY

// QuerybyUserID handler
router.get('/', async (req,res, next)=> {
    try {
        const userRequest = req.user
        const foundUser = await User.findOne({
            username: userRequest.username,
            password: userRequest.password
        });
        if ((foundUser.username == userRequest.username) && (foundUser.password == userRequest.password)) {
            res.json(foundUser);
        }
        else {
            res.status(400)
            console.log('error hit')
        }
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
        const userRequest=req.user
        const userCreated = await User.create(userRequest);
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