import { Component } from "preact";
import Router from "preact-router";

import { get } from "../request";
import Home from "../routes/home";
import Game from "../routes/game";
import Loader from "./loader";

const {
  GAME_END_TYPE,
  MESSAGE,
  EMOJI,
  LOAD_STATUS
} = require("../../../__internal/constants");

export default class App extends Component {
  state = {
    gameEnd: null,
    token: null,
    load: { status: LOAD_STATUS.LOADED, message: null }
  };

  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    if (this.state.token) {
      return Router.route(`/game/${this.state.token}`);
    }
    this.currentUrl = e.url;
  };

  startGame = async () => {
    this.setState(
      { load: { status: LOAD_STATUS.LOADING, message: null } },
      async () => {
        try {
          const res = await get("create-game");
          const { token } = await res.json();
          this.setState({
            load: { status: LOAD_STATUS.LOADED, message: null },
            token
          });
        } catch (e) {
          let error;
          if (typeof e.json !== "function") {
            error = { message: MESSAGE.SERVER_ERROR };
          } else {
            error = await e.json();
          }

          this.setState({
            load: { status: LOAD_STATUS.ERROR, message: error.message }
          });
        }
      }
    );
  };

  handleError = error => {
    this.setState(
      {
        load: { status: LOAD_STATUS.ERROR, message: error, token: null }
      },
      () => {
        Router.route("/");
      }
    );
  };

  removeGame = gameEnd => {
    this.setState({ gameEnd, token: null }, () => {
      Router.route("/");
    });
  };

  getFeedbackMessage = () => {
    const { gameEnd, load } = this.state;

    if (load.status === LOAD_STATUS.ERROR) {
      return { emoji: EMOJI.SAD, message: load.message };
    }

    if (gameEnd === GAME_END_TYPE.WON) {
      return { emoji: EMOJI.PARTY, message: MESSAGE.WON };
    }

    if (gameEnd === GAME_END_TYPE.TIE) {
      return { emoji: EMOJI.THUMBS_UP, message: MESSAGE.TIE };
    }

    if (gameEnd === GAME_END_TYPE.LOST) {
      return { emoji: EMOJI.SAD, message: MESSAGE.LOST };
    }

    if (gameEnd === GAME_END_TYPE.PLAYER_TIMEOUT) {
      return { emoji: EMOJI.SAD, message: MESSAGE.PLAYER_TIMEOUT };
    }

    return { emoji: EMOJI.SAD, message: MESSAGE.GAME_TIMEOUT };
  };

  render(_, { gameEnd, load, token }) {
    if (load.status === LOAD_STATUS.LOADING) {
      return <Loader />;
    }

    const feedback =
      load.status === LOAD_STATUS.ERROR || gameEnd
        ? this.getFeedbackMessage()
        : null;

    return (
      <Router onChange={this.handleRoute}>
        <Home
          path="/"
          startGame={this.startGame}
          feedback={feedback}
          onError={this.handleError}
        />
        <Game
          path="/game/:token"
          removeGame={this.removeGame}
          onError={this.handleError}
        />
      </Router>
    );
  }
}
