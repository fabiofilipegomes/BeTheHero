
exports.up = function(knex) {
    return knex.schema.createTable('incidents', (table) => {
      table.increments();

      table.string('ong_id').notNullable();
      table.foreign('ong_id').references('id').inTable('ongs');

      table.string('title').notNullable();
      table.string('description').notNullable();
      table.float('value').notNullable();
    });  
};

exports.down = function(knex) {
    knex.schema.dropTable('incidents');
};
