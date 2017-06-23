const express = require('express');
const router = express.Router();

let fetchTodos = require('./controllers/fetch_todos.controller.js');
let fetchTodo = require('./controllers/fetch_todo.controller.js');
let createTodo = require('./controllers/create_todo.controller.js');
let editTodo = require('./controllers/edit_todo.controller.js');
let deleteTodo = require('./controllers/delete_todo.controller.js');

router.get('/', fetchTodos);
router.post('/', createTodo);
router.get('/:id', fetchTodo);
router.put('/:id', editTodo);
router.delete('/:id', deleteTodo);

module.exports = router;