"use strict";

const Hapi = require("hapi");
const SocketServer = require("socket.io");
const Boom = require("boom");
const HapiSwagger = require("hapi-swagger");
const Inert = require("inert");
const Vision = require("vision");

const { EVENT } = require("./__internal/constants");
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
  isSecure: process.env.NODE_ENV === "production",
  isHttpOnly: false,
  isSameSite: "Lax"
});

// connections
const MAX_GAMES = 10000;
const games = {};

function isMaxGamesReached() {
  return Object.keys(games).length === MAX_GAMES;
}

function handleGameCreation(token) {
  if (isMaxGamesReached()) {
    throw Boom.badRequest("Games limit reached.");
  }

  function deleteGame() {
    delete games[token];
  }

  // create a new namespace for the token
  const namespace = new SocketServer(server.listener, {
    path: `/socket.io/${token}`
  });

  const game = new Game({
    words: shuffleArray(words),
    namespace,
    deleteGame: deleteGame
  });

  games[token] = game;

  namespace.on(EVENT.CONNECTION, socket => {
    // register player
    const username = socket.handshake.query.username;
    game.addSocket({ socket, username });

    // add flip event listener
    socket.on(EVENT.CARD_FLIP, word => game.flip({ word, username }));
  });
}

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
    // ---------------------
    // setup routes
    // ----------------------

    server.route({
      method: "GET",
      path: "/{path*}",
      handler: {
        directory: {
          path: "./build"
        }
      }
    });

    server.route({
      method: "GET",
      path: "/game/{path*}",
      handler: (_, h) => {
        return h.file("./build/index.html");
      }
    });

    server.route(createGameRoute({ onGameCreated: handleGameCreation }));
    server.route(getGameData({ games }));

    // start the server
    return server.start();
  })
  .then(() => {
    if (process.env.NODE_ENV === "prod") {
      console.clear();
      console.log("The game is running on:", server.info.uri);
    }
  });
