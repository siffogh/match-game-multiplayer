import { Component } from "preact";
import Router from "preact-router";

import Home from "../routes/home";
import Game from "../routes/game";

const {
  GAME_END_TYPE,
  MESSAGE,
  EMOJI
} = require("../../../__internal/constants");

export default class App extends Component {
  state = {
    error: null,
    gameEnd: null
  };

  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  handleError = error => {
    this.setState({ error });
  };

  removeGame = gameEnd => {
    Router.route("/");
    this.setState({ gameEnd });
  };

  getFeedbackMessage = () => {
    const { error, gameEnd } = this.state;

    console.log({ gameEnd });

    if (gameEnd === GAME_END_TYPE.WON) {
      return { emoji: EMOJI.PARTY, message: MESSAGE.WON };
    }

    if (gameEnd === GAME_END_TYPE.TIE) {
      return { emoji: EMOJI.THUMBS_UP, message: MESSAGE.TIE };
    }

    if (error) {
      return { emoji: EMOJI.SAD, message: error };
    }

    if (gameEnd === GAME_END_TYPE.LOST) {
      return { emoji: EMOJI.SAD, message: MESSAGE.LOST };
    }

    if (gameEnd === GAME_END_TYPE.PLAYER_TIMEOUT) {
      return { emoji: EMOJI.SAD, message: MESSAGE.PLAYER_TIMEOUT };
    }

    return { emoji: EMOJI.SAD, message: MESSAGE.GAME_TIMEOUT };
  };

  render(props, { error, gameEnd }) {
    const feedback = error || gameEnd ? this.getFeedbackMessage() : null;

    return (
      <Router>
        <Home path="/" feedback={feedback} />
        <Game
          path="/game/:token"
          removeGame={this.removeGame}
          onError={this.handleError}
        />
      </Router>
    );
  }
}
