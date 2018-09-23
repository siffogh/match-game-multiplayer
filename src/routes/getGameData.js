const Boom = require("boom");

module.exports = function({ games }) {
  function handler(request, h) {
    const { token } = request.payload;
    const game = games[token];

    if (!game) {
      throw Boom.badRequest("There is no available active game for such url.");
    }

    // handle userCookie
    let userCookie = request.state.user;
    if (!userCookie || (userCookie && userCookie.token !== token)) {
      const { username, color } = game.generatePlayer();
      try {
        userCookie = {
          username,
          color,
          token: token
        };
      } catch (e) {
        throw Boom.badRequest(e.message);
      }
    }

    // register the player
    game.registerPlayer({
      username: userCookie.username,
      color: userCookie.color
    });

    // return response
    return h
      .response({
        words: game.words,
        ...game.getGameStats(),
        username: userCookie.username
      })
      .state("user", userCookie);
  }

  return {
    method: "POST",
    path: "/api/game-data",
    handler,
    config: {
      tags: ["api"],
      cors: {
        origin: ["*"],
        credentials: true
      }
    }
  };
};
