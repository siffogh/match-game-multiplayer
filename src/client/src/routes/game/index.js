/* eslint react/sort-comp: 0 */

import { Component } from "preact";
import { route } from "preact-router";
import io from "socket.io-client";
import { fromEvent, Observable } from "rxjs";
import { throttleTime } from "rxjs/operators";

import { post } from "../../request";
import Card from "../../components/card";
import Loader from "../../components/loader";
import style from "./style";

const {
  GAME_END_TYPE,
  ERROR,
  EVENT,
  LOAD_STATUS,
  MESSAGE
} = require("../../../../__internal/constants");

export default class Game extends Component {
  state = {
    flippedIndices: [],
    words: [],
    matches: {},
    load: {
      status: LOAD_STATUS.LOADING,
      message: null
    },
    countdown: 20,
    players: [],
    username: null
  };

  constructor(props) {
    super(props);
    this.socket = null;
    this.flipObservable = Observable.create(observer => {
      this.flipNext = word => observer.next(word);
    });
    this.flipObservable.pipe(throttleTime(500)).subscribe(this.flipCard);
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
        this.initSocket
      );
    } catch (e) {
      let error;
      if (typeof e.json !== "function") {
        error = { message: MESSAGE.SERVER_ERROR };
      } else {
        error = await e.json();
      }

      this.props.onError(error.message);
    }
  };

  initSocket = () => {
    this.socket = io(`http://localhost:3000?username=${this.state.username}`, {
      path: `/socket.io/${this.props.token}`
    });

    fromEvent(this.socket, EVENT.CARD_FLIPPED).subscribe(this.handleCardFlip);

    fromEvent(this.socket, EVENT.PLAYER_COUNTDOWN_UPDATED).subscribe(
      this.handlePlayerCountdownUpdate
    );

    fromEvent(this.socket, EVENT.PLAYERS_UPDATED).subscribe(
      this.handlePlayersUpdate
    );

    fromEvent(this.socket, EVENT.GAME_END).subscribe(this.handleGameEnd);
  };

  handleCardFlip = newStats => {
    this.setState(newStats);
  };

  handlePlayerCountdownUpdate = countdown => {
    this.setState({ countdown });
  };

  handlePlayersUpdate = players => {
    this.setState({ players });
  };

  handleGameEnd = message => {
    this.socket.close();
    this.props.removeGame(message);
  };

  handleGameStart = token => {
    route(`/game/${token}`);
    this.loadGameData(token);
  };

  handleDisconnect = () => {
    this.setState({
      load: {
        status: LOAD_STATUS.ERROR,
        message: ERROR.DISCONNECT
      }
    });
  };

  flipCard = word => {
    this.socket.emit(EVENT.CARD_FLIP, word);
  };

  leaveGame = () => {
    this.socket.close();
    this.route("/");
  };

  getMyPlayer = () => {
    return this.state.players.find(
      player => player.username === this.state.username
    );
  };

  getCurrentPlayer = () => {
    return this.state.players.find(player => player.canPlay);
  };

  render(_, { load, words, flippedIndices, matches, countdown, players }) {
    if (load.status === LOAD_STATUS.LOADING) {
      return <Loader />;
    }

    const myPlayer = this.getMyPlayer();
    const currentPlayer = this.getCurrentPlayer();

    return (
      <div class={style.game}>
        <div class={style.header}>
          {players.map(({ username, score, canPlay, color }) => (
            <div
              class={canPlay ? style.currentPlayer : style.otherPlayer}
              style={{ borderColor: color, color }}
            >
              {username}: {score}
            </div>
          ))}
        </div>
        <main class={style.body}>
          <div class={style.canPlay}>
            {!myPlayer.canPlay ? "Wait for your turn" : "Your turn"}
          </div>
          {countdown > 10 ? null : (
            <div
              class={style.countdown}
              style={{ backgroundColor: currentPlayer.color }}
            >
              {countdown}
            </div>
          )}
          <div class={style.grid} data-canPlay={myPlayer.canPlay}>
            {words.map(word => (
              <Card
                front={"?"}
                back={word.value}
                isFlipped={flippedIndices.includes(word.key)}
                match={matches[word.key]}
                disabled={!myPlayer.canPlay}
                onClick={() => this.flipNext(word)}
              />
            ))}
          </div>
        </main>
      </div>
    );
  }
}
