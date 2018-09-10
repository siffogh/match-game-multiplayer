module.exports = class Connection {
  constructor({ socket, id, game, endGame }) {
    // bind methids
    this.handleFlip = this.handleFlip.bind(this);

    this.socket = socket;
    this.id = id;
    this.game = game;
    this.endGame = endGame;

    // add listener
    this.socket.on("flip", this.handleFlip);
  }

  handleFlip(idx) {
    this.game.flip(idx);

    this.socket.emit("flipped", this.game.getStats());
    this.socket.broadcast.emit("flipped", this.game.getStats());
    if (this.game.score === 6) {
      this.endGame();
    }
  }
};
