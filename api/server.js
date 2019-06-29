const express = require('express')

// import models
const Games = require("../games/gamesModel.js")

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ message: "API is online... Standing by..." })
})