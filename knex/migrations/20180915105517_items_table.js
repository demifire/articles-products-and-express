
exports.up = function(knex, Promise) {
    return knex.schema.createTable('items', function(table) {
        table.increments();
        table.string('name').notNullable();
        table.string('price').notNullable();
        table.string('inventory').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('items');
};
