const express = require("express");

// import models
const Games = require("../games/gamesModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "API is online... Standing by..." });
});

server.get("/games", (req, res) => {
  Games.find()
    .then(games => {
      res.status(200).json(games);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  const newGame = { title, genre, releaseYear };
  if (!title || !genre) {
    return res
      .status(422)
      .json({
        message: "Please include both a title and a genre for the game!"
      });
  } else {
    Games.add(newGame)
      .then(games => {
        res.status(201).json(games);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

module.exports = server
