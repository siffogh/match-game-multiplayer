module.exports = class Game {
  constructor({ grid, flippedCardIdx = null, matches = {}, score = 0 }) {
    this.grid = grid;
    this.flippedCardIdx = flippedCardIdx;
    this.matches = matches;
    this.score = score;

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
      flippedCardIdx: this.flippedCardIdx,
      matches: this.matches,
      score: this.score
    };
  }

  flip(idx) {
    if (this.flippedCardIdx === null) {
      this.flippedCardIdx = idx;
      return;
    }

    let isMatch = false;

    const currentWord = this.getWordByIndex(idx);
    const prevWord = this.getWordByIndex(this.flippedCardIdx);

    this.grid.forEach(row => {
      // if there is a match, push the indices to the matches
      if (row.includes(currentWord) && row.includes(prevWord)) {
        this.matches[idx] = true;
        this.matches[this.flippedCardIdx] = true;
        this.score++;
      }
    });

    if (!isMatch) {
      this.flippedCardIdx = idx;
    }
  }
};
