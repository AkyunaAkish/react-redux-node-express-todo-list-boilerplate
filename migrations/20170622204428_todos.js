exports.up = (knex, Promise) => {
    return knex.schema.createTable('todos', (table) => {
        table.increments();
        table.text('content', 'longtext').notNullable();
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('todos');
};