const Boom = require("boom");

module.exports = function({ games }) {
  function handler(request) {
    const { token } = request.payload;
    const game = games[token];
    if (!game) {
      throw Boom.badRequest("There is no available active game for such url.");
    }

    if (game.isFull) {
      throw Boom.badRequest(
        "Sorry, the maximum number of players in this game has been reached."
      );
    }

    return { grid: game.grid, ...game.getStats() };
  }

  return {
    method: "POST",
    path: "/game-data",
    handler,
    config: {
      cors: {
        origin: ["*"],
        credentials: true
      }
    }
  };
};
