"use strict";

const Hapi = require("hapi");
const SocketServer = require("socket.io");
const Boom = require("boom");

const createGameRoute = require("./routes/createGame");
const getGameData = require("./routes/getGameData");
const Game = require("./Game");

function shuffleArray(array) {
  return [...array].sort(function(){return Math.random() - Math.random()});
}

const words = [
  {
    value: 'jung',
    key: 0,
    match: 1
  },
  {
    value: 'young',
    key: 1,
    match: 0
  },
  {
    value: 'möglich',
    key: 2,
    match: 3
  },
  {
    value: 'possible',
    key: 3,
    match: 2
  },
  {
    value: 'nichts',
    key: 4,
    match: 5
  },
  {
    value: 'nothing',
    key: 5,
    match: 4
  },
  {
    value: 'stuhl',
    key: 6,
    match: 7
  },
  {
    value: 'chair',
    key: 7,
    match: 6
  },
  {
    value: 'hell',
    key: 8,
    match: 9
  },
  {
    value: 'bright',
    key: 9,
    match: 8
  },
  {
    value: 'kurs',
    key: 10,
    match: 11
  },
  {
    value: 'course',
    key: 11,
    match: 10
  }
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

  const game = new Game({ words: shuffleArray(words), namespace });
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
