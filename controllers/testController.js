const express = require('express');
const router = express.Router();
const Test = require('../models/testsModel');
const User = require('../models/userModel')

// QuerybyTestID handler
router.post('/manyTests', async(req,res,next)=> {
    try {
        console.log(req.user)
        if (req.user) {
            console.log(req.body)
            let testArr = req.body.tests
            let allTests = []
            for(i=0;i <testArr.length;i++) {
                foundTest = await Test.findById(testArr[i]._id)
                console.log(`A test was fetched ${foundTest}`);
                allTests.push(foundTest)
            }
            res.json(allTests)
        }
        else {
            res.status(403).json('BAD TOKEN')
        }
    }
    catch(error) {
        res.status(400).json(error)
    }
})
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
            console.log(req.body)
            updatedTest = await Test.findByIdAndUpdate(req.body.id, {body: req.body.newData})
            console.log(`$A test was updated : ${updatedTest}`)
            res.json(updatedTest.body)
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