const mongoose = require('mongoose');
const bugVh = new mongoose.Schema({
    editor: {type: mongoose.Types.ObjectId, ref: "User"},
    bug: {type: mongoose.Types.ObjectId, ref: "AllBugs"},
    body: {type: String},
    dateCreated: {type: Date},
    dateLastEdited: {type:Date}
}, {timestamps:true})
const BugVH = mongoose.model('BugVH', bugVh)
module.exports = BugVH
