function generateToken() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

module.exports = function({ onGameCreated }) {
  function handler() {
    const token = generateToken();

    try {
      onGameCreated(token);
    } catch (e) {
      throw e;
    }

    return { token };
  }

  return {
    method: "GET",
    path: "/create-game",
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
