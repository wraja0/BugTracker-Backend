const mongoose = require('mongoose');
const tests = new mongoose.Schema({
    creator: {type: mongoose.Types.ObjectId, ref: "User"},
    bug: {type: mongoose.Types.ObjectId, ref: "AllBugs"},
    body: {type: String},
    dateCreated: {type: Date},
    dateLastEdited: {type:Date}
}, {timestamps:true})
const Tests = mongoose.model('Tests', tests)
module.exports = Tests
