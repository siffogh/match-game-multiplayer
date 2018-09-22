const { GAME_END_TYPE, EVENT } = require("../__internal/constants");

module.exports = class Game {
  constructor({ words, namespace, onGameEnd }) {
    // bind methods
    this.flip = this.flip.bind(this);
    this.getPlayerStats = this.getPlayerStats.bind(this);
    this.handleCountdownChange = this.handleCountdownChange.bind(this);
    this.handleMatch = this.handleMatch.bind(this);
    this.handleMismatch = this.handleMismatch.bind(this);

    // initial data
    this.words = words;
    this.namespace = namespace;
    this.onGameEnd = onGameEnd;
    this.flippedIndices = [];
    this.matches = {};
    this.score = {};
    this.MAX_MATCHES = 12;
    this.availableUsernames = ["blue", "red"];
    this.countdown = {
      value: 20,
      interval: setInterval(this.handleCountdownChange, 1000),
      reset: () => (this.countdown.value = 20)
    };
    this.players = {};
    this.currentPlayer = null;
  }

  getPlayerStats(username) {
    return {
      flippedIndices: this.flippedIndices,
      matches: this.matches,
      score: this.players[username].score,
      canPlay: this.currentPlayer === username
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

  generateUsername() {
    if (this.availableUsernames.length === 0) {
      throw new Error(
        "Sorry, the maximum number of players in this game has been reached."
      );
    }

    // get random index
    const idx = Math.floor(Math.random() * this.availableUsernames.length);

    // return username
    return this.availableUsernames.splice(idx, 1)[0];
  }

  registerPlayer({ username, socket }) {
    const player = this.players[username] || {};

    // update socket
    if (socket) {
      player.socket = socket;
    }

    const isFirstRegistrationForPlayer = typeof player.score === "undefined";
    const isFirstRegistrationInGame = Object.keys(this.players).length === 0;

    if (isFirstRegistrationForPlayer) {
      player.score = 0;
    }

    if (isFirstRegistrationInGame) {
      this.currentPlayer = username;
    }

    // add player to players
    Object.assign(this.players, { [username]: player });
  }

  switchCurrentPlayer() {
    // if there is just one player registered, set the current username to that player
    if (Object.keys(this.players).length === 1) {
      this.currentPlayer = Object.keys(this.players)[0];
    } else {
      // set current username to the other username
      const usernames = Object.keys(this.players);
      this.currentPlayer =
        this.currentPlayer === usernames[0] ? usernames[1] : usernames[0];
    }

    // in 1000 seconds, update players whether they can play or not
    setTimeout(() => {
      Object.entries(this.players).forEach(([username, player]) => {
        const canPlay = this.currentPlayer === username;

        player.socket.emit(EVENT.CURRENT_PLAYER_SWITCHED, canPlay);
      });
    }, 1000);
  }

  removeCurrentPlayer() {
    // if this is the last player, close the game
    if (Object.keys(this.players).length === 1) {
      this.namespace.emit(EVENT.GAME_END, GAME_END_TYPE.TIMEOUT);
      this.endGame();
      return;
    }

    // make the username available for future joins to the game
    this.availableUsernames.push(this.currentPlayer);

    // emit contdown expired to the concerned player
    this.players[this.currentPlayer].socket.emit(
      EVENT.PLAYER_COUNTDOWN_EXPIRED
    );

    // delete the player
    delete this.players[this.currentPlayer];

    // switch player so that it becomes a single player game
    this.switchCurrentPlayer();
  }

  resetFlippedIndices(cb = () => {}) {
    this.flippedIndices = [];
    setTimeout(() => {
      Object.entries(this.players).forEach(([username, { socket }]) => {
        socket.emit(EVENT.CARD_FLIPPED, this.getPlayerStats(username));
      });
      cb();
    }, 500);
  }

  handleMatch(username) {
    // push matches
    this.flippedIndices.forEach(idx => (this.matches[idx] = { username }));

    // incement the score of the player
    this.players[username].score++;

    // check whether the current player won
    if (Object.keys(this.matches).length === this.MAX_MATCHES) {
      if (Object.keys(this.players).length === 1) {
        setTimeout(() => {
          this.players[username].socket.emit(EVENT.GAME_END, GAME_END_TYPE.WON);
          this.endGame();
        }, 1000);
      } else if (this.players[username].score < 3) {
        setTimeout(() => {
          this.players[username].socket.emit(
            EVENT.GAME_END,
            GAME_END_TYPE.LOST
          );
          this.players[username].socket.broadcast.emit(
            EVENT.GAME_END,
            GAME_END_TYPE.WON
          );
          this.endGame();
        }, 1000);
      } else if (this.players[username].score > 3) {
        setTimeout(() => {
          this.players[username].socket.emit(EVENT.GAME_END, GAME_END_TYPE.WON);
          this.players[username].socket.broadcast.emit(
            EVENT.GAME_END,
            GAME_END_TYPE.LOST
          );
          this.endGame();
        }, 1000);
      } else {
        setTimeout(() => {
          this.namespace.emit(EVENT.GAME_END, GAME_END_TYPE.TIE);
          this.endGame();
        }, 1000);
      }
    }

    this.resetFlippedIndices();
  }

  handleMismatch() {
    this.resetFlippedIndices(() => this.switchCurrentPlayer());
  }

  flip({ username, word }) {
    // update countdown
    this.countdown.reset();

    this.flippedIndices.push(word.key);

    this.namespace.emit(EVENT.CARD_FLIPPED, this.getPlayerStats(username));

    if (this.flippedIndices.length === 1) {
      return;
    }

    word.match === this.flippedIndices[0]
      ? this.handleMatch(username)
      : this.handleMismatch();
  }
  endGame() {
    clearInterval(this.countdown.interval);
    return this.onGameEnd();
  }
};
