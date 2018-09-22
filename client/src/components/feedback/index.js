import { Component } from "preact";
import { route } from "preact-router";

import Button from "../../components/button";
import { get } from "../../request";
import style from "./style";

const LOAD_STATUS = {
  LOADED: 0,
  LOADING: 1,
  ERROR: 2
};

export default class Feedback extends Component {
  state = {
    load: { status: LOAD_STATUS.LOADED, message: null }
  };

  startGame = async () => {
    this.setState(
      { load: { status: LOAD_STATUS.LOADING, message: null } },
      async () => {
        try {
          const res = await get("create-game");
          const { token } = await res.json();
          console.log({ token });
          return route(`/game/${token}`);
        } catch (e) {
          const error = await e.json();
          this.setState({
            load: { status: LOAD_STATUS.ERROR, message: error.message }
          });
        }
      }
    );
  };

  render(props, { load }) {
    // get the right content based on load status
    let content;
    switch (load.status) {
      case LOAD_STATUS.ERROR:
        content = (
          <div class="feedback-message">
            <div class="emoji">😕</div>
            <div>{load.message}</div>
          </div>
        );
        break;
      case LOAD_STATUS.LOADING:
        content = <div> Loading...</div>;
        break;
      default:
        content = (
          <div>
            <div class="feedback-message">{props.children}</div>
            <Button onClick={this.startGame}>New Game</Button>
          </div>
        );
    }

    return <div class={style.feedback}>{content}</div>;
  }
}
