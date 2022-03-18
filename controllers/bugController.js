const express = require('express');
const router = express.Router();
const Bug = require('../models/allBugsModel');
const User = require('../models/userModel');
const Test = require('../models/testsModel');
const { findOne } = require('../models/userModel');

// QuerybyBugID handler
router.post('/', async (req, res)=> {
    try {
        if(req.user) {
            const userAuth = req.user
            const foundUser = await User.findOne({username:userAuth.username})
            if ((userAuth.username == foundUser.username) && (userAuth.password == foundUser.password)) {
                let bugQue = []
                let testArr = []
                for (i=0;i<req.body.ids.length;i++) {
                    console.log(i)
                    const bugQued = await Bug.findById(req.body.ids[i]);
                    console.log(bugQued)
                    bugQue.push(bugQued)
                    let testIdArr = bugQued.tests
                    let testArrmini = []
                    for (j=0;j<testIdArr.length;j++) {
                        const foundTest = await Test.findById(testIdArr[j])
                        testArrmini.push(foundTest)
                    }
                    testArr.push(testArrmini)
                }
            console.log ('Bugs were fetched with the following attributes :',bugQue);
            res.json({bugQue:bugQue,testArr:testArr});
            }
        }
        else return res.status(401)
    }
    catch (error) {
        res.status(400).json(error);
    }
});

// Create Bug Handler 
router.post('/create', async (req,res)=> {
    try {
        const managerUser = (req.user)
        console.log(req.body)
        const devUser = await User.findOne({username:req.body.dev})
        console.log(devUser)
        if (req.user.class== 'manager') {
            console.log('also working')
            const bugCreated = await Bug.create({
                codeBase: req.body.codeBase,
                managerAssigned: managerUser._id,
                devsAssigned: devUser._id,
            });
            const devsUpdatedBugQue = await User.findByIdAndUpdate(devUser._id,{$addToSet:{bugsQue:bugCreated._id}})
            const managerUpdatedBugQue = await User.findByIdAndUpdate(managerUser._id,{$addToSet: {bugsQue:bugCreated._id}})
            const testsCreated = await Test.create(req.body.tests)
            const testIdArrs = []
            for (i=0; i<testsCreated.length; i++) {
                testIdArrs.push(testsCreated[i]._id)
                await User.findByIdAndUpdate(managerUser._id, {$addToSet: {testsCreated: testIdArrs[i]}})
                await Bug.findByIdAndUpdate(bugCreated._id,{$addToSet: {tests: testIdArrs[i]}})
            }
            console.log('A Bug was just created with the following attributes : ', bugCreated);
            console.log('A User was just upated with the following attributes : ',devsUpdatedBugQue);
            console.log('A User was just upated with the following attributes : ',managerUpdatedBugQue);
            console.log('Tests were create with the following attributes')
            res.json(req.body);    
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