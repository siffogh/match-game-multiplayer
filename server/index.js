"use strict";

const Hapi = require("hapi");
const SocketServer = require("socket.io");
const Boom = require("boom");

const createGameRoute = require("./routes/createGame");
const getGameData = require("./routes/getGameData");
const Game = require("./Game");
const Connection = require("./Connection");

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
const games = {};

function isMaxGamesReached() {
  return Object.keys(games).length === MAX_GAMES;
}

function handleGameCreation(token) {
  if (isMaxGamesReached()) {
    throw Boom.badRequest("Games limit reached.");
  }

  const socketServer = new SocketServer(server.listener, {
    path: `/${token}`
  });

  const game = new Game({ grid });
  games[token] = game;

  socketServer.on("connection", socket => {
    function endGame() {
      socket.disconnect();
      delete games[token];
    }

    socket.on("disconnect", endGame);

    return new Connection({ socket, id: token, game, endGame });
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
