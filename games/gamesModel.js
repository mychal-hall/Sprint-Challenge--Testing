const db = require("../data/dbConfig.js");

module.exports = {
  find,
  add
};

function find() {
  return db("games");
}

async function add(game) {
  const [id] = await db("games").insert(game);
  return db("games")
    .where({ id })
    .first();
}
