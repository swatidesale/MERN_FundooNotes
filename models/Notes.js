const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Note Schema
const NoteSchema = new Schema({
    notetitle: {
        type: String
    },
    notedata: {
        type: String
    },
    ispin: {
        type: Boolean,
        default: false
    },
    istrash: {
        type: Boolean,
        default: false
    },
    isarchive: {
        type: Boolean,
        default: false
    },
    background: {
        type: String
    },
    reminder: {
        type: String
    }
});

module.exports = Note = mongoose.model('Note',NoteSchema)