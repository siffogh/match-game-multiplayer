"use strict";

const Hapi = require("hapi");
const SocketServer = require("socket.io");
const Boom = require("boom");

const createGameRoute = require("./routes/createGame");
const getGameData = require("./routes/getGameData");
const Game = require("./Game");

const grid = [
  ["halo", "hello"],
  ["mous", "mause"],
  ["stuhl", "chair"],
  ["wasser", "water"],
  ["hell", "bright"],
  ["kurs", "course"]
];

const server = Hapi.server({
  host: "localhost",
  port: 3000
});

// connections
const MAX_GAMES = 1;
const MAX_PLAYERS_PER_GAME = 2;
const games = {};

function isMaxGamesReached() {
  return Object.keys(games).length === MAX_GAMES;
}

function handleGameCreation(token) {
  if (isMaxGamesReached()) {
    throw Boom.badRequest("Games limit reached.");
  }

  // create a new namespace for the token
  const namespace = new SocketServer(server.listener, {
    path: `/${token}`
  });

  const game = new Game({ grid, namespace });
  games[token] = game;

  namespace.on("connection", socket => {
    // check if game is full
    namespace.clients((_, clients) => {
      games[token].isFull = clients.length === MAX_PLAYERS_PER_GAME;
    });

    // add flip event listener
    socket.on("flip", game.flip);

    // add listener for disconnect
    socket.on("disconnect", () => {
      // remove game if no clients are left
      games[token].isFull = false;
      namespace.clients((error, clients) => {
        if (error || clients.length === 0) {
          delete games[token];
        }
      });
    });
  });
}

// ---------------------
// setup routes
// ----------------------
server.route(createGameRoute({ handleGameCreation }));
server.route(getGameData({ games }));

// start the server
server.start().then(() => {
  console.log("Server running at:", server.info.uri);
});
