const express = require('express');
const router = express.Router();
const BugVH = require('../models/bugVhModel');

// QuerybyID handler
router.get('/:query', async (req, res)=> {
    try {
        const bugVHQued = await BugVH.findById(req.params.query);
        console.log ('A BugVH was fetched with the following attributes :',bugVHQued);
        res.json(bugVHQued);
    }
    catch (error) {
        res.status(400).json(error);
    }
});

// Create BugVH Handler 
router.post('/create', async (req,res)=> {
    try {
        const bugVHCreated = await BugVH.create(req.body);
        console.log('A BugVH was just created with the following attributes : ',bugVHCreated);
        res.json(bugVHCreated);
    }
    catch(error) {
        res.status(400).json(error);
    }
});
router.put('/:id/update', async (req,res)=> {
    try {
        const bugVHWarped = await BugVH.findByIdAndUpdate(req.params.id,req.body);
        console.log('A BugVH has been updated with the following attributes : ',bugVHWarped);
        res.json(bugVHWarped);
    }
    catch(error) {
        res.status(400).json(error);
    }
});
router.delete('/:id/delete', async (req,res)=> {
    try {
        const bugVHDelted = await BugVH.findByIdAndDelete(req.params.id);
        console.log ('A BugVH has been deleted with the following attributes : ', bugVHDelted);
        res.json(bugVHDelted);
    }
    catch(error) {
        res.status(400).json(error);
    }
});
module.exports = router;