const fetchTodo = require('../actions/fetchTodo.js');

module.exports = (req, res) => {
    fetchTodo(req, res).then((todo) => {
                                            res.status(200).json({
                                                success: todo
                                            });
                                        }).catch((err) => {
                                            res.status(500).json({
                                                error: 'An error occurred when fetching a todo.',
                                                reason: err
                                            });
                                        });
};