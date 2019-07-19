// Imports
const request = require("supertest");
const server = require("../api/server.js");
const db = require("../data/dbConfig.js");
const Games = require("./gamesModel.js");

// Tests for the gamesModel

// Can touch the DataBase and add() a game

describe("gamesModel", () => {
  describe("add function", () => {
    afterEach(async () => {
      await db("games").truncate();
    });

    it("properly adds a game", async () => {
      await Games.add({ title: "Pacman", genre: "Arcade", releaseYear: 1980 });
      await Games.add({
        title: "Shining Force",
        genre: "Strategy Role-Playing Game",
        releaseYear: 1992
      });

      const games = await db("games");

      expect(games).toHaveLength(2);
      expect(games[1].title).toBe("Shining Force");
    });


    // Tests making sure the api responds correctly to correct and incorrect data


    // Success

    it("status 201 on add", async () => {
      let res = await request(server)
        .post("/games")
        .send({ title: "Pacman", genre: "Arcade", releaseYear: 1980 });

      expect(res.status).toBe(201);
    });


    // Missing Data Failure

    it("status 422 on missing fields", async () => {
        let res = await request(server)
        .post("/games")
        .send({ releaseYear: 1980 });

      expect(res.status).toBe(422);
    })
  });
});
