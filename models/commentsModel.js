const mongoose = require('mongoose');
const comments = new mongoose.Schema({
    owner: {type: mongoose.Types.ObjectId, ref: "User"},
    bug: {type: mongoose.Types.ObjectId, ref: "AllBugs"},
    body: {type: String},
    heading: {type: String},
    dateCreated: {type: Date},
    dateLastEdited: {type:Date}
}, {timestamps:true})
const Comments = mongoose.model('Comments', comments)
module.exports = Comments
