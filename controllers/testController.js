const express = require('express');
const router = express.Router();
const Test = require('../models/testsModel');

// QuerybyTestID handler
router.get('/:query', async (req, res)=> {
    try {
        const testQued = await Test.findById(req.params.query);
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
router.put('/:id/update', async (req,res)=> {
    try {
        const testWarped = await Test.findByIdAndUpdate(req.params.id,req.body);
        console.log('A Test has been updated with the following attributes : ',testWarped);
        res.json(testWarped);
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