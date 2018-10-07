module.exports = {
  EVENT: {
    CARD_FLIP: "CARD_FLIP",
    CONNECTION: "connection",
    GAME_UPDATE: "GAME_UPDATE",
    GAME_END: "GAME_END"
  },
  MESSAGE: {
    SERVER_ERROR:
      "Sorry, there seems to be a connection problem with the server.",
    WON: "You won!",
    LOST: "You lost!",
    TIE: "Well Played! It's a tie.",
    GAME_TIMEOUT: "This game has been closed due to inactivity.",
    PLAYER_TIMEOUT:
      "You have been removed from the game due to inactivity. You can join again on the same link or create a new game."
  },
  EMOJI: {
    SAD: "😕",
    PARTY: "🎉",
    THUMBS_UP: "👍🏻"
  },
  GAME_END_TYPE: {
    WON: "WON",
    LOST: "LOST",
    TIE: "TIE",
    GAME_TIMEOUT: "TIMEOUT",
    PLAYER_TIMEOUT: "PLAYER_TIMEOUT"
  },
  LOAD_STATUS: {
    LOADED: "LOADED",
    LOADING: "LOADING",
    ERROR: "ERROR",
    GAME_END: "GAME_END",
    PLAYER_TIMEOUT: "PLAYER_TIMEOUT"
  }
};
