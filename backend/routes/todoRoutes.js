const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

router
    .route('/')
    .post(todoController.createTodo)
    .get(todoController.getAllTodos);

router
    .route('/:id')
    .get(todoController.getTodo);

router
    .route('/:id')
    .patch(todoController.updateTodo);

router
    .route('/:id')
    .delete(todoController.deleteTodo);

module.exports = router;