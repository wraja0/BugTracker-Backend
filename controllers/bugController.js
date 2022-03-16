const express = require('express');
const router = express.Router();
const Bug = require('../models/allBugsModel');
const User = require('../models/userModel')

// QuerybyBugID handler
router.get('/:query', async (req, res)=> {
    try {
        const bugQued = await Bug.findById(req.params.query);
        console.log ('A Bug was fetched with the following attributes :',bugQued);
        res.json(bugQued);
    }
    catch (error) {
        res.status(400).json(error);
    }
});

// Create Bug Handler 
router.post('/create', async (req,res)=> {
    try {
        if (req.user) {
            const userAuth = req.user
            const userRequest = req.body
            console.log(userAuth)
            console.log(userRequest)
            const foundAuthUser = await User.findOne({
                username: userAuth.username,
                password: userAuth.password
            });
            const foundDev = await User.findOne({username: userRequest.dev})
            if ((foundAuthUser.username == userAuth.username) && (foundAuthUser.password == userAuth.password)) {
                const bugCreated = await Bug.create({
                    codeBase: userRequest.codeBase,
                    managerAssigned: foundAuthUser._id,
                    devsAssigned: foundDev._id,
                });
                const devsUpdated = await User.findByIdAndUpdate(foundDev._id,{$addToSet:{bugsQue:bugCreated._id}})
                const bugUpdated = await Bug.findByIdAndUpdate(bugCreated._id,{$addToSet: { assigned:foundDev._id }})
                const managerUpdated = await User.findByIdAndUpdate(foundAuthUser._id,{$addToSet: {bugsQue:bugCreated._id}})
                console.log('A Bug was just created with the following attributes : ',bugUpdated);
                console.log('A User was just upated with the following attributes : ',devsUpdated);
                res.json(req.body);
            }
        }
    }
    catch(error) {
        res.status(400).json(error);
    }
});
router.put('/:id/update', async (req,res)=> {
    try {
        const bugWarped = await Bug.findByIdAndUpdate(req.params.id,req.body);
        console.log('A Bug has been updated with the following attributes : ',bugWarped);
        res.json(bugWarped);
    }
    catch(error) {
        res.status(400).json(error);
    }
});
router.delete('/:id/delete', async (req,res)=> {
    try {
        const bugDelted = await Bug.findByIdAndDelete(req.params.id);
        console.log ('A Bug has been deleted with the following attributes : ', bugDelted);
        res.json(bugDelted);
    }
    catch(error) {
        res.status(400).json(error);
    }
});
module.exports = router;