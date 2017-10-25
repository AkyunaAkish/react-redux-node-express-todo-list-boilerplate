const deleteTodo = require('../actions/deleteTodo.js');

module.exports = (req, res) => {
    deleteTodo(req, res).then((todo) => {
                                            res.status(200).json({
                                                success: todo
                                            });
                                        }).catch((err) => {
                                            res.status(500).json({
                                                error: 'An error occurred when deleting a todo.',
                                                reason: err
                                            });
                                        });
};