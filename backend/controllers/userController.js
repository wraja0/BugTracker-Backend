const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// QuerybyUserID handler
router.get('/:query', async (req, res)=> {
    try {
        const userQued = await User.findById(req.params.query);
        console.log ('A user was just created with the following attributes :',userQued);
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
router.put('/:id/update', (req,res)=> {
    try {
        const userWarped = await User.findByIdAndUpdate(req.params.id,req.body);
        console.log('A user has been updated with the following attributes : ',userWarped);
        res.json(userWarped);
    }
    catch(error) {
        res.status(400).json(error);
    }
});
router.delete('/:id/delete', (req,res)=> {
    try {
        const userDelted = await User.findByIdAndDelete(req.params.id);
        console.log ('A user has been deleted with the following attributes : ', userDelted);
        res.json(userDelted);
    }
    catch(error) {
        res.status(400).json(error);
    }
});