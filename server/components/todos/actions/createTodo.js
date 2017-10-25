const knex = require('../../../dbConnect');

module.exports = (req, res) => {
    return knex('todos').insert({
                                  content: req.body.content
                                }).returning('*');
};