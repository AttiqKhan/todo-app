const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    todo: {
        type: String,
        required: [true, 'Todo is required']
    },
    isDone: {
        type: Boolean,
        default: false
    },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;