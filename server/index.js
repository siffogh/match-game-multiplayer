"use strict";

const Hapi = require("hapi");
const SocketServer = require("socket.io");
const Boom = require("boom");
const HapiSwagger = require("hapi-swagger");
const Inert = require("inert");
const Vision = require("vision");

const words = require("./words");
const createGameRoute = require("./routes/createGame");
const getGameData = require("./routes/getGameData");
const Game = require("./Game");

function shuffleArray(array) {
  return [...array].sort(function() {
    return Math.random() - Math.random();
  });
}

const server = new Hapi.Server({
  host: "localhost",
  port: 3000
});

// prepare user cookie
server.state("user", {
  encoding: "base64json",
  isSecure: process.env.NODE_ENV === "production"
});

// connections
const MAX_GAMES = 1;
const games = {};

function isMaxGamesReached() {
  return Object.keys(games).length === MAX_GAMES;
}

function handleGameCreation(token) {
  if (isMaxGamesReached()) {
    throw Boom.badRequest("Games limit reached.");
  }

  function handleGameEnd() {
    delete games[token];
  }

  // create a new namespace for the token
  const namespace = new SocketServer(server.listener, {
    path: `/${token}`
  });

  const game = new Game({
    words: shuffleArray(words),
    namespace,
    handleGameEnd
  });
  games[token] = game;

  namespace.on("connection", socket => {
    // add flip event listener
    socket.on("flip", word => game.flip({ word, socket }));
    // socket.on("remove_player", username => game.removePlayer(username));
  });
}

// ---------------------
// setup routes
// ----------------------
server.route(createGameRoute({ handleGameCreation }));
server.route(getGameData({ games }));

// swagger
const swaggerOptions = {
  info: {
    title: "Test API Documentation",
    version: "1.0.0"
  }
};

server
  .register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])
  .then(() => {
    // start the server
    return server.start();
  })
  .then(() => {
    console.log("Server running at:", server.info.uri);
  });
