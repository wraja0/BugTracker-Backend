const express = require('express');
const router = express.Router();
const Comment = require('../models/commentsModel');

// QuerybyCommentID handler
router.get('/:query', async (req, res)=> {
    try {
        const commentQued = await Comment.findById(req.params.query);
        console.log ('A Comment was fetched with the following attributes :',commentQued);
        res.json(commentQued);
    }
    catch (error) {
        res.status(400).json(error);
    }
});

// Create Comment Handler 
router.post('/create', async (req,res)=> {
    try {
        const commentCreated = await Comment.create(req.body);
        console.log('A Comment was just created with the following attributes : ',commentCreated);
        res.json(commentCreated);
    }
    catch(error) {
        res.status(400).json(error);
    }
});
router.put('/:id/update', async (req,res)=> {
    try {
        const commentWarped = await Comment.findByIdAndUpdate(req.params.id,req.body);
        console.log('A Comment has been updated with the following attributes : ',commentWarped);
        res.json(commentWarped);
    }
    catch(error) {
        res.status(400).json(error);
    }
});
router.delete('/:id/delete', async (req,res)=> {
    try {
        const commentDelted = await Comment.findByIdAndDelete(req.params.id);
        console.log ('A Comment has been deleted with the following attributes : ', commentDelted);
        res.json(commentDelted);
    }
    catch(error) {
        res.status(400).json(error);
    }
});
module.exports = router;