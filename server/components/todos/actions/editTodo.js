const knex = require('../../../dbConnect');

module.exports = (req, res) => {
    return knex('todos')
        .where({
            id: req.params.id
        })
        .update({
            content: req.body.content
        }).returning('*');
};