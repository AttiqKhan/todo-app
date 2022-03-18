const Todo = require('../models/todoModel');

exports.createTodo = async (req, res) => {
    console.log(req.body);
    try {
        const newTodo = await Todo.create(req.body);

        res.status(201).json({
            status: 'success',
            todo: newTodo
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data'
        });
    }
};

exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();

        res.status(200).json({
            status: 'success',
            todos
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findById(id);

        res.status(200).json({
            status: 'success',
            todo
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updateTodo = async (req, res) => {
    console.log(req.body);
    try {
        const id = req.params.id;
        const body = req.body;
        
        const todo = await Todo.findByIdAndUpdate(id,body, {new: true});

        res.status(200).json({
            status: 'success',
            todo
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deleteTodo = async (req, res) => {
    console.log(req.params.id);
    try {
        const id = req.params.id;

        await Todo.findByIdAndDelete(id);

        res.status(204).json({
            status: 'success',
            todo: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};