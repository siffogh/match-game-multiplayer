module.exports = class Game {
  constructor({ words, namespace }) {
    this.words = words;
    this.namespace = namespace;
    this.flippedIndices = [];
    this.matches = {};
    this.score = 0;
    this.MAX_SCORE = 6;

    // bind methods
    this.flip = this.flip.bind(this);
    this.getStats = this.getStats.bind(this);
  }

  getStats() {
    return {
      flippedIndices: this.flippedIndices,
      matches: this.matches,
      score: this.score
    };
  }

  flip(word) {
    this.flippedIndices.push(word.key);
    this.namespace.emit("flipped", this.getStats());

    if (this.flippedIndices.length === 1) {
      return;
    }

    const isMatch = word.match === this.flippedIndices[0];
    if(isMatch) {
      // push matches
      this.flippedIndices.forEach(idx => this.matches[idx] = true);

      // incement score
      this.score++;
      if (this.score === this.MAX_SCORE) {
        setTimeout(() => this.namespace.emit("win"), 1000);
      }

      // reset flippedIndices
      this.flippedIndices = [];
      setTimeout(() => this.namespace.emit("matched", this.getStats()), 500);
      return;
    }

      // reset flippedIndices
      this.flippedIndices = [];
      setTimeout(() => this.namespace.emit("mismatched", this.getStats()), 500);
  }
};
