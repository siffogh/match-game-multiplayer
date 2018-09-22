const { GAME_END_TYPE, EVENT } = require("../__internal/constants");

const usernameToColor = {
  player1: "blue",
  player2: "red"
};

module.exports = class Game {
  constructor({ words, namespace, deleteGame }) {
    // bind methods
    this.flip = this.flip.bind(this);
    this.getPlayers = this.getPlayers.bind(this);
    this.getGameStats = this.getGameStats.bind(this);
    this.handleCountdownChange = this.handleCountdownChange.bind(this);
    this.handleMatch = this.handleMatch.bind(this);
    this.handleMismatch = this.handleMismatch.bind(this);
    this.endGame = this.endGame.bind(this);
    this.registerPlayer = this.registerPlayer.bind(this);
    this.addSocket = this.addSocket.bind(this);

    // initial data
    this.words = words;
    this.namespace = namespace;
    this.deleteGame = deleteGame;
    this.flippedIndices = [];
    this.matches = {};
    this.score = {};
    this.MAX_MATCHES = 12;
    this.availablePlayers = [
      { username: "player1", color: usernameToColor.player1 },
      { username: "player2", color: usernameToColor.player2 }
    ];
    this.countdown = {
      value: 20,
      interval: setInterval(this.handleCountdownChange, 1000),
      reset: () => (this.countdown.value = 20)
    };
    this.players = {};
    this.currentPlayerUsername = null;
  }

  getPlayers() {
    return Object.entries(this.players).map(([username, { score, color }]) => {
      return {
        username,
        score,
        canPlay: username === this.currentPlayerUsername,
        color
      };
    });
  }

  getGameStats() {
    return {
      flippedIndices: this.flippedIndices,
      matches: this.matches,
      players: this.getPlayers()
    };
  }

  handleCountdownChange() {
    this.countdown.value--;

    if (this.countdown.value === 0) {
      this.countdown.reset();
      return this.removeCurrentPlayer();
    }

    this.namespace.emit(EVENT.PLAYER_COUNTDOWN_UPDATED, this.countdown.value);
  }

  generatePlayer() {
    if (this.availablePlayers.length === 0) {
      throw new Error(
        "Sorry, the maximum number of players in this game has been reached."
      );
    }

    // return username
    return this.availablePlayers.splice(0, 1)[0];
  }

  registerPlayer({ username, color }) {
    const player = this.players[username] || {};

    // set color
    player.color = color;

    const isFirstRegistrationForPlayer = typeof player.score === "undefined";
    const isFirstRegistrationInGame = Object.keys(this.players).length === 0;

    if (isFirstRegistrationForPlayer) {
      player.score = 0;
    }

    if (isFirstRegistrationInGame) {
      this.currentPlayerUsername = username;
    }

    // add player to players
    Object.assign(this.players, { [username]: player });
    this.namespace.emit(EVENT.PLAYERS_UPDATED, this.getPlayers());
  }

  addSocket({ username, socket }) {
    const player = this.players[username];

    if (!player) {
      return;
    }

    // update socket
    player.socket = socket;
  }

  switchCurrentPlayer() {
    // if there is just one player registered, set the current username to that player
    if (Object.keys(this.players).length === 1) {
      this.currentPlayerUsername = Object.keys(this.players)[0];
    } else {
      // set current username to the other username
      const usernames = Object.keys(this.players);
      this.currentPlayerUsername =
        this.currentPlayerUsername === usernames[0]
          ? usernames[1]
          : usernames[0];
    }
  }

  removeCurrentPlayer() {
    // if this is the last player, close the game
    if (Object.keys(this.players).length === 1) {
      this.namespace.emit(EVENT.GAME_END, GAME_END_TYPE.GAME_TIMEOUT);
      this.closeGame();
      return;
    }

    // make the player available for future joins to the game
    this.availablePlayers.push({
      username: this.currentPlayerUsername,
      color: usernameToColor[this.currentPlayerUsername]
    });

    // emit contdown expired to the concerned player
    this.players[this.currentPlayerUsername].socket.emit(
      EVENT.PLAYER_COUNTDOWN_EXPIRED
    );

    // delete the player
    delete this.players[this.currentPlayerUsername];

    // switch player so that it becomes a single player game
    this.switchCurrentPlayer();

    // emit players update
    this.namespace.emit(EVENT.PLAYERS_UPDATED, this.getPlayers());
  }

  resetFlippedIndices() {
    this.flippedIndices = [];
    setTimeout(() => {
      this.namespace.emit(EVENT.CARD_FLIPPED, this.getGameStats());
    }, 500);
  }

  endGame(username) {
    if (Object.keys(this.players).length === 1) {
      setTimeout(() => {
        this.players[username].socket.emit(EVENT.GAME_END, GAME_END_TYPE.WON);
        this.closeGame();
      }, 1000);
    } else if (this.players[username].score < 3) {
      setTimeout(() => {
        this.players[username].socket.emit(EVENT.GAME_END, GAME_END_TYPE.LOST);
        this.players[username].socket.broadcast.emit(
          EVENT.GAME_END,
          GAME_END_TYPE.WON
        );
        this.closeGame();
      }, 1000);
    } else if (this.players[username].score > 3) {
      setTimeout(() => {
        this.players[username].socket.emit(EVENT.GAME_END, GAME_END_TYPE.WON);
        this.players[username].socket.broadcast.emit(
          EVENT.GAME_END,
          GAME_END_TYPE.LOST
        );
        this.closeGame();
      }, 1000);
    } else {
      setTimeout(() => {
        this.namespace.emit(EVENT.GAME_END, GAME_END_TYPE.TIE);
        this.closeGame();
      }, 1000);
    }
  }

  handleMatch(username) {
    // push matches
    this.flippedIndices.forEach(
      idx => (this.matches[idx] = { color: this.players[username].color })
    );

    // increment the score of the player
    this.players[username].score++;

    // check whether the current player won
    if (Object.keys(this.matches).length === this.MAX_MATCHES) {
      this.endGame(username);
    }

    this.resetFlippedIndices();
  }

  handleMismatch() {
    this.resetFlippedIndices();
    this.switchCurrentPlayer();
  }

  flip({ username, word }) {
    // update countdown
    this.countdown.reset();

    this.flippedIndices.push(word.key);

    this.namespace.emit(EVENT.CARD_FLIPPED, this.getGameStats());

    if (this.flippedIndices.length === 1) {
      return;
    }

    word.match === this.flippedIndices[0]
      ? this.handleMatch(username)
      : this.handleMismatch();
  }

  closeGame() {
    clearInterval(this.countdown.interval);
    return this.deleteGame();
  }
};
