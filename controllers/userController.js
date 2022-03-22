const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const bCrypt = require('bcrypt')
require('dotenv').config();
const key = process.env.USERFRONT_PUBLIC_KEY

// RESPOND WITH LOGGED IN USER 
router.get('/login',(req,res, next)=> {
    if (req.user) res.json(req.user)
    next();
})
// REPOND WITH ALL USERS HAVING THE CLASS OF 'DEV'
router.get('/allDevs', async (req, res)=> {
    try {
        if ((req.user) && (req.user.class==='manager')) {
                const allUsers = await User.find({class:"dev"});
                for (i=0; i<allUsers.length; i++) {
                    allUsers[i].password = '********'
                }
                console.log ('All users were fetched :',allUsers);
                res.json(allUsers);
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});

// Create User Handler 
router.put('/:id/update', async (req,res)=> {
    try {
        if (req.user) {
            const userWarped = await User.findByIdAndUpdate(req.user._id,req.body);
            console.log('A user has been updated with the following attributes : ',userWarped);
            res.status(200);
        }
    }
    catch(error) {
        res.status(400).json(error);
    }
});
router.delete('/:id/delete', async (req,res)=> {
    try {if (req.user) {
            const userDelted = await User.findByIdAndDelete(req.user._Id);
            console.log ('A user has been deleted with the following attributes : ', userDelted);
            res.status(200)
        }
    }
    catch(error) {
        res.status(400).json(error);
    }
});
module.exports = router;