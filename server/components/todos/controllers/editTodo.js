const editTodo = require('../actions/editTodo.js');

module.exports = (req, res) => {
    editTodo(req, res)
        .then((todo) => {
            res.status(200).json({
                success: todo
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: 'An error occurred when editing a todo.',
                reason: err
            });
        });
};