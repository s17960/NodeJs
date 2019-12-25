var mongoose = require('mongoose');

var Task = new mongoose.Schema({
    Text: String,
    IsDone: Boolean
});

module.exports = mongoose.model('Task', Task, 'Task');