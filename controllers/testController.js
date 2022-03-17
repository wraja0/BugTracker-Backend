const express = require('express');
const router = express.Router();
const Test = require('../models/testsModel');
const User = require('../models/userModel')

// QuerybyTestID handler
router.get('/:query', async (req, res)=> {
    try {
        const testQued = await Test.findById(req.body.test);
        console.log ('A Test was fetched with the following attributes :',testQued);
        res.json(testQued);
    }
    catch (error) {
        res.status(400).json(error);
    }
});

// Create Test Handler 
router.post('/create', async (req,res)=> {
    try {
        const testCreated = await Test.create(req.body);
        console.log('A Test was just created with the following attributes : ',testCreated);
        res.json(testCreated);
    }
    catch(error) {
        res.status(400).json(error);
    }
});
router.put('/update', async (req,res)=> {
    try {
        if (req.user) {
            userAuth = req.user
            const foundUser = await User.findOne({username: userAuth.username})
            console.log(foundUser)
            console.log(req.body)
            if ((foundUser.username == userAuth.username) && (foundUser.password == userAuth.password)) {
                updatedTest = await Test.findByIdAndUpdate(req.body.id, {body: req.body.test})
                console.log(updatedTest)
                res.json(updatedTest)
            }
        }
        else res.status(401)
    }
    catch(error) {
        res.status(400).json(error);
    }
});
router.delete('/:id/delete', async (req,res)=> {
    try {
        const testDelted = await Test.findByIdAndDelete(req.params.id);
        console.log ('A Test has been deleted with the following attributes : ', testDelted);
        res.json(testDelted);
    }
    catch(error) {
        res.status(400).json(error);
    }
});
module.exports = router;