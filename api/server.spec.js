const request = require("supertest");
const server = require("./server.js");
const db = require("../data/dbConfig.js");

// Tests for the server.js

// cleanup after each test

describe("server.GET /games", () => {
  afterEach(async () => {
    await db("games").truncate();
  });

  // Can return 200

  it("is status 200", async () => {
    const res = await request(server).get("/games");
    expect(res.status).toBe(200);
  });

  // success returning the game object

  it("properly returns the games array", async () => {
    const res = await request(server).get("/games");
    expect(res.body).toEqual([]);
  });

  // success getting ALL the games in the object

  it("properly returns all the games in array", async () => {
    const allGames = [
      {
        id: 1,
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      },
      {
        id: 2,
        title: "Shining Force",
        genre: "Strategy Role-Playing Game",
        releaseYear: 1992
      }
    ];

    await db("games").insert(allGames);

    const res = await request(server).get("/games");
    expect(res.body).toEqual(allGames);
  });
});
