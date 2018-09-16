/* eslint react/sort-comp: 0 */

import { Component } from "preact";
import { route } from "preact-router";
import io from "socket.io-client";
import { fromEvent, merge } from "rxjs";

import Card from "../../components/card";
import Feedback from "../../components/feedback";
import { BASE_URL, post } from "../../request";

import {
  LOAD_STATUS,
  DISCONNECT_ERROR,
  DISCONNECT_REASON,
  getWords
} from "./service";
import style from "./style";

export default class Game extends Component {
  state = {
    flippedIndices: [],
    grid: [],
    score: 0,
    matches: {},
    load: {
      status: LOAD_STATUS.LOADING,
      message: null
    }
  };

  constructor(props) {
    super(props);
    this.socket = null;
  }

  async componentDidMount() {
    this.loadGameData(this.props.token);
  }

  loadGameData = async token => {
    try {
      const res = await post("game-data", {
        token
      });
      const stats = await res.json();
      this.setState(
        {
          ...stats,
          load: {
            status: LOAD_STATUS.LOADED
          }
        },
        () => {
          this.initSocket();
        }
      );
    } catch (e) {
      const { message } = await e.json();
      this.setState({
        load: {
          status: LOAD_STATUS.ERROR,
          message
        }
      });
    }
  };

  initSocket = () => {
    this.socket = io(BASE_URL, {
      path: `/${this.props.token}`
    });
    const flippedObservable = fromEvent(this.socket, "flipped");
    const matchedObservable = fromEvent(this.socket, "matched");
    const mismatchedObservable = fromEvent(this.socket, "mismatched");
    merge(flippedObservable, matchedObservable, mismatchedObservable).subscribe(
      this.handleFlipped
    );
    fromEvent(this.socket, "disconnect").subscribe(this.handleDisconnect);
    fromEvent(this.socket, "win").subscribe(this.handleWin);
  };

  handleGameStart = token => {
    route(`/game/${token}`);
    this.loadGameData(token);
  };

  handleDisconnect = reason => {
    if (reason === DISCONNECT_REASON.WIN) {
      return;
    }

    const message = DISCONNECT_ERROR;
    this.setState({
      load: {
        status: LOAD_STATUS.ERROR,
        message
      }
    });
  };

  handleFlipped = newStats => {
    this.setState(newStats);
  };

  handleFlip = idx => {
    this.socket.emit("flip", idx);
  };

  handleWin = () => {
    this.socket.close();
    this.setState({
      load: {
        status: LOAD_STATUS.WIN
      }
    });
  };

  render(_, { load, grid, flippedIndices, matches }) {
    if (load.status === LOAD_STATUS.LOADING) {
      return <div class={style.loading}>Loading... </div>;
    }

    if (load.status === LOAD_STATUS.ERROR) {
      return (
        <Feedback onGameStart={this.handleGameStart}>
          <div class="emoji">😕 </div>
          <div class={style.message}>{load.message} </div>
        </Feedback>
      );
    }

    if (load.status === LOAD_STATUS.WIN) {
      return (
        <Feedback onGameStart={this.handleGameStart}>
          <div class="emoji">🎉 </div> <div> Congratulations! </div>
          <div> You won! </div>
        </Feedback>
      );
    }

    return (
      <div class={style.game}>
        <div class={style.header}>Score: {this.state.score} </div>
        <main class={style.body}>
          >
          <div class={style.grid}>
            {getWords(grid).map((word, idx) => (
              <Card
                front={"?"}
                back={word}
                isFlipped={flippedIndices.includes(idx)}
                isDisabled={Boolean(matches[idx])}
                onClick={() => this.handleFlip(idx)}
              />
            ))}
          </div>
        </main>
      </div>
    );
  }
}
