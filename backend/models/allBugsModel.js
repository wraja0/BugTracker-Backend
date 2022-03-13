const mongoose = require('mongoose');
const allBugsSchema = new mongoose.Schema({
    assigned: [{type: mongoose.Types.ObjectId, ref: "User"}],
    devsAssigned: [{type: mongoose.Types.ObjectId, ref: "User"}],
    managerAssigned: [{type: mongoose.Types.ObjectId, ref: "User"}],
    codeBase: {type: String},
    comments: [{type: mongoose.Types.ObjectId, ref: "Comments"}],
    tests: [{type: mongoose.Types.ObjectId, ref: "Tests"}],
    approved: {type: Boolean},
    versionHistory: [{type: mongoose.Types.ObjectId, ref: "BugVH"}],
    dateCreated: {type: Date},
    dateLastEdited: {type:Date}
}, {timestamps:true})
const AllBugs = mongoose.model('AllBugs', allBugsSchema)
module.exports = AllBugs
