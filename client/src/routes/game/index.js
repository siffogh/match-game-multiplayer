/* eslint react/sort-comp: 0 */

import { Component } from "preact";
import { route } from "preact-router";
import io from "socket.io-client";
import { fromEvent } from "rxjs";
import Card from "../../components/card";
import Feedback from "../../components/feedback";
import { BASE_URL, post } from "../../request";

import style from "./style";

const {
  GAME_END_TYPE,
  ERROR,
  EVENT,
  LOAD_STATUS
} = require("../../../../__internal/constants");

export default class Game extends Component {
  state = {
    flippedIndices: [],
    words: [],
    score: 0,
    matches: {},
    load: {
      status: LOAD_STATUS.LOADING,
      message: null
    },
    countdown: 20,
    username: "",
    canPlay: false
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
        this.initSocket
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
    this.socket = io(`${BASE_URL}?username=${this.state.username}`, {
      path: `/${this.props.token}`
    });

    fromEvent(this.socket, EVENT.CARD_FLIPPED).subscribe(this.handleCardFlip);

    fromEvent(this.socket, EVENT.PLAYER_COUNTDOWN_UPDATED).subscribe(
      this.handlePlayerCountdownUpdate
    );

    fromEvent(this.socket, EVENT.PLAYER_COUNTDOWN_EXPIRED).subscribe(
      this.handlePlayerCountdownExpiry
    );

    fromEvent(this.socket, EVENT.CURRENT_PLAYER_SWITCHED).subscribe(
      this.handleCurrentPlayerSwitch
    );

    fromEvent(this.socket, EVENT.GAME_END).subscribe(this.handleGameEnd);

    // fromEvent(this.socket, DISCONNECT).subscribe(this.handleDisconnect);
  };

  handleCardFlip = newStats => {
    this.setState(newStats);
  };

  handlePlayerCountdownUpdate = countdown => {
    this.setState({ countdown });
  };

  handlePlayerCountdownExpiry = () => {
    this.socket.close();
    this.setState({
      load: {
        status: LOAD_STATUS.TIMEOUT
      }
    });
  };

  handleCurrentPlayerSwitch = canPlay => {
    this.setState({ canPlay });
  };

  handleGameEnd = message => {
    this.setState({ load: { status: LOAD_STATUS.GAME_END, message } });
    this.socket.close();
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

  handleFlip = word => {
    this.socket.emit(EVENT.CARD_FLIP, word);
  };

  render(
    _,
    {
      username,
      score,
      load,
      words,
      flippedIndices,
      matches,
      countdown,
      canPlay
    }
  ) {
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

    if ([LOAD_STATUS.GAME_END, LOAD_STATUS.TIMEOUT].includes(load.status)) {
      let emoji, message;
      if (load.status === LOAD_STATUS.TIMEOUT) {
        emoji = "😕";
        message = `You have been removed from the game. You can restart to join again
        or create a new game.`;
      } else {
        switch (load.message) {
          case GAME_END_TYPE.WON:
            emoji = "🎉";
            message = "Congratulations!";
            break;
          case GAME_END_TYPE.LOST:
            emoji = "😕";
            message = "You lost!";
            break;
          case GAME_END_TYPE.TIE:
            emoji = "👍🏻";
            message = "Well Played! It's a tie.";
            break;
          default:
            emoji = "😕";
            message = "This game has been closed due to inactivity.";
        }
      }

      return (
        <Feedback onGameStart={this.handleGameStart}>
          <div class="emoji">{emoji}</div>
          <div> {message}</div>
        </Feedback>
      );
    }

    return (
      <div class={style.game}>
        <div class={style.header}>
          <div class={style.score} style={{ color: username.toLowerCase() }}>
            Score: {score}
          </div>
        </div>
        <main class={style.body}>
          <div class={style.canPlay}>
            {!canPlay ? "Wait for your turn" : "Your turn"}
          </div>
          {countdown > 10 ? null : (
            <div class={style.countdown}>{countdown}</div>
          )}
          <div class={style.grid} data-canPlay={canPlay}>
            {words.map(word => (
              <Card
                front={"?"}
                back={word.value}
                isFlipped={flippedIndices.includes(word.key)}
                match={matches[word.key]}
                onClick={!canPlay ? () => {} : () => this.handleFlip(word)}
              />
            ))}
          </div>
        </main>
      </div>
    );
  }
}
