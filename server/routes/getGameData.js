const Boom = require("boom");

module.exports = function({ games }) {
  function handler(request) {
    const { token } = request.payload;
    const game = games[token];
    if (!game) {
      throw Boom.badRequest("There is no available active game for such url.");
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
