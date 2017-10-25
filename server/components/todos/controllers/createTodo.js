const createTodo = require('../actions/createTodo.js');

module.exports = (req, res) => {
    createTodo(req, res).then((todo) => {
                                            res.status(200).json({
                                                success: todo
                                            });
                                        }).catch((err) => {
                                            res.status(500).json({
                                                error: 'An error occurred when adding a todo.',
                                                reason: err
                                            });
                                        });
};