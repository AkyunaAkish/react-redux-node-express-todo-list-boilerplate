const express = require('express');
const router = express.Router();

let fetchTodos = require('./controllers/fetchTodos.js');
let fetchTodo = require('./controllers/fetchTodo.js');
let createTodo = require('./controllers/createTodo.js');
let editTodo = require('./controllers/editTodo.js');
let deleteTodo = require('./controllers/deleteTodo.js');

router.get('/', fetchTodos);
router.post('/', createTodo);
router.get('/:id', fetchTodo);
router.put('/:id', editTodo);
router.delete('/:id', deleteTodo);

module.exports = router;