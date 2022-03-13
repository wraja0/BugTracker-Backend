const express = require('express');
const router = express.Router();
const Bug = require('../models/allBugsModel');

// QuerybyUserID handler
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
        const bugCreated = await Bug.create(req.body);
        console.log('A Bug was just created with the following attributes : ',bugCreated);
        res.json(bugCreated);
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