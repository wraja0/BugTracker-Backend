const express = require('express');
const router = express.Router();
const Bug = require('../models/allBugsModel');
const User = require('../models/userModel');
const Test = require('../models/testsModel')

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
        if (req.user) {
            const userAuth = req.user
            const userRequest = req.body
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
                const testsCreated = await Test.create(userRequest.tests)
                const testIdArrs = []
                const devsUpdatedBugQue = await User.findByIdAndUpdate(foundDev._id,{$addToSet:{bugsQue:bugCreated._id}})
                const bugUpdateAssigned = await Bug.findByIdAndUpdate(bugCreated._id,{$addToSet: { assigned:foundDev._id }})
                const managerUpdatedBugQue = await User.findByIdAndUpdate(foundAuthUser._id,{$addToSet: {bugsQue:bugCreated._id}})
                for (i=0; i<testsCreated.length; i++) {
                    testIdArrs.push(testsCreated[i]._id)
                    await User.findByIdAndUpdate(foundAuthUser._id, {$addToSet: {testsCreated: testIdArrs[i]}})
                    await Bug.findByIdAndUpdate(bugCreated._id,{$addToSet: {tests: testIdArrs[i]}})
                }
                console.log('A Bug was just created with the following attributes : ',bugUpdated);
                console.log('A User was just upated with the following attributes : ',devsUpdated);
                console.log(`peep da set boi ${managerUpdatedTests}`)
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