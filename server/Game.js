module.exports = class Game {
  constructor({ words, namespace, handleGameEnd }) {
    // bind methods
    this.flip = this.flip.bind(this);
    this.getStats = this.getStats.bind(this);
    this.handleTimeoutChange = this.handleTimeoutChange.bind(this);
    this.handleMatch = this.handleMatch.bind(this);
    this.handleMismatch = this.handleMismatch.bind(this);

    // initial data
    this.words = words;
    this.namespace = namespace;
    this.handleGameEnd = handleGameEnd;
    this.flippedIndices = [];
    this.matches = {};
    this.score = 0;
    this.MAX_SCORE = 6;
    this.availableUsernames = ["blue", "red"];
    this.timeout = {
      value: 20,
      interval: setInterval(this.handleTimeoutChange, 1000),
      reset: () => (this.timeout.value = 20)
    };
    this.players = { current: null, other: null };
    this.stats = {};
  }

  handleTimeoutChange() {
    this.timeout.value--;

    if (this.timeout.value === 0) {
      this.timeout.reset();
      return this.removeCurrentPlayer();
    }

    this.namespace.emit("timeout_update", this.timeout.value);
  }

  generateUsername() {
    if (this.availableUsernames.length === 0) {
      throw new Error(
        "Sorry, the maximum number of players in this game has been reached."
      );
    }

    const isFirstPlayer = this.availableUsernames.length === 2;
    const idx = Math.floor(Math.random() * this.availableUsernames.length);
    const username = this.availableUsernames.splice(idx, 1)[0];

    // initiate stats for the username
    this.stats[username] = {};

    // set initial players
    if (isFirstPlayer) {
      this.players = { current: username, other: username };
    } else {
      this.players.other = username;
    }

    return username;
  }

  switchCurrentPlayer() {
    this.timeout.reset();

    const { current: other, other: current } = this.players;

    this.players = { current, other };

    setTimeout(() => {
      this.namespace.emit("switch_player", this.players);
    }, 1000);
  }

  removeCurrentPlayer() {
    this.availableUsernames.push(this.players.current);
    this.players.current = null;

    // if this is the last player, close the game
    if (!this.players.other) {
      clearInterval(this.timeout.interval);
      this.namespace.emit("game_end_timeout");
      return this.handleGameEnd();
    }

    this.namespace.emit("timeout_end");
    this.switchCurrentPlayer();
  }

  getStats() {
    return {
      flippedIndices: this.flippedIndices,
      matches: this.matches,
      score: this.score,
      players: this.players
    };
  }

  handleMatch(socket) {
    // push matches
    this.flippedIndices.forEach(idx => (this.matches[idx] = true));

    // incement score
    this.score++;
    if (this.score === this.MAX_SCORE) {
      setTimeout(() => {
        socket.emit("win");
        socket.broadcast.emit("loss");
      }, 1000);
    } else {
      this.switchCurrentPlayer();
    }

    // reset flippedIndices
    this.flippedIndices = [];
    setTimeout(() => this.namespace.emit("matched", this.getStats()), 500);
  }

  handleMismatch() {
    // reset flippedIndices
    this.flippedIndices = [];
    this.switchCurrentPlayer();
    setTimeout(() => this.namespace.emit("mismatched", this.getStats()), 500);
  }

  flip({ socket, word }) {
    // update timeout
    this.timeout.reset();

    this.flippedIndices.push(word.key);
    this.namespace.emit("flipped", this.getStats());

    if (this.flippedIndices.length === 1) {
      return;
    }

    word.match === this.flippedIndices[0]
      ? this.handleMatch(socket)
      : this.handleMismatch();
  }
};
