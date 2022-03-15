const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    class: {type: String},
    emai: {type: String},
    password: {type: String},
    username: {type: String},
    bugsQue: [{type: mongoose.Types.ObjectId, ref: "AllBugs"}],
    bugsRemoved: [{type: mongoose.Types.ObjectId, ref: "AllBugs"}],
    bugsEdited: [{type: mongoose.Types.ObjectId, ref: "BugVH"}],
    testsCreated: [{type:mongoose.Types.ObjectId, ref: "Tests"}],
    comments:[{type: mongoose.Types.ObjectId, ref: "Comments"}],
    position: {type: String},
    dateCreated: {type: Date},
    dateLastEdited: {type:Date}
}, {timestamps:true})
const User = mongoose.model('User', userSchema)
module.exports = User
