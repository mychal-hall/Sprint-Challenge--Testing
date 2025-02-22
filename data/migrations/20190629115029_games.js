exports.up = function(knex) {
  return knex.schema.createTable("games", tbl => {
    tbl.increments();
    tbl.string("title", 255).notNullable();
    tbl.string("genre", 255).notNullable();
    tbl.integer("releaseYear");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("games");
};

// EXPECTED DATA STRUCTURE
// {
//     title: 'Pacman', // required
//     genre: 'Arcade', // required
//     releaseYear: 1980 // not required
//   }
