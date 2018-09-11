module.exports = class Game {
  constructor({ grid, namespace }) {
    this.grid = grid;
    this.namespace = namespace;
    this.flippedIndices = [];
    this.matches = {};
    this.score = 0;
    this.MAX_SCORE = 6;

    // bind methods
    this.flip = this.flip.bind(this);
    this.getStats = this.getStats.bind(this);
    this.getWordByIndex = this.getWordByIndex.bind(this);
  }

  getWordByIndex(idx) {
    const row = Math.floor(idx / 2);
    const col = idx % 2;
    return this.grid[row][col];
  }

  getStats() {
    return {
      flippedIndices: this.flippedIndices,
      matches: this.matches,
      score: this.score
    };
  }

  flip(idx) {
    this.flippedIndices.push(idx);
    this.namespace.emit("flipped", this.getStats());

    if (this.flippedIndices.length === 1) {
      return;
    }

    let isMatch = false;

    const currentWord = this.getWordByIndex(idx);
    const prevWord = this.getWordByIndex(this.flippedIndices[0]);

    this.grid.forEach(row => {
      // if there is a match, push the indices to the matches
      if (row.includes(currentWord) && row.includes(prevWord)) {
        this.flippedIndices.forEach(
          flippedIdx => (this.matches[flippedIdx] = true)
        );

        this.score++;
        if (this.score === this.MAX_SCORE) {
          setTimeout(() => this.namespace.emit("win"), 1000);
        }
        // reset flippedIndices
        this.flippedIndices = [];
        setTimeout(() => this.namespace.emit("matched", this.getStats()), 500);
      }
    });

    if (!isMatch) {
      // reset flippedIndices
      this.flippedIndices = [];
      setTimeout(() => this.namespace.emit("mismatched", this.getStats()), 500);
    }
  }
};
