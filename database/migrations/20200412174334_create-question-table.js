const { QUESTION_STATUS } = require("../../lib/constants/database-constants");

exports.up = knex => {
  return knex.schema.createTable("question", table => {
    table.increments("id").primary();
    table.string("question");
    table.integer("status").defaultTo(QUESTION_STATUS.DEFAULT);
    table.timestamps([true], [true]);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists("question");
};
