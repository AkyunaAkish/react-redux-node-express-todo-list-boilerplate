const fetchTodos = require('../actions/fetchTodos.js');

module.exports = (req, res) => {
    fetchTodos(req, res).then((todos) => {
                                             res.status(200).json({
                                                 success: todos
                                             });
                                         }).catch((err) => {
                                             res.status(500).json({
                                                  error: 'An error occurred when fetching all todos.',
                                                  reason: err
                                             });
                                         });
};