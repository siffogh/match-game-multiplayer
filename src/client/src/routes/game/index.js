import { Component } from 'preact';
import io from 'socket.io-client';
import { fromEvent, Observable } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import { post } from '../../request';
import Card from '../../components/card';
import Loader from '../../components/loader';
import style from './style';

const {
  EVENT,
  LOAD_STATUS,
  FLIP_STATUS,
  MESSAGE
} = require('../../../../__internal/constants');

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
      const res = await post('game-data', {
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
      if (typeof e.json !== 'function') {
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

    fromEvent(this.socket, EVENT.GAME_UPDATE).subscribe(this.handleGameUpdate);
    fromEvent(this.socket, EVENT.GAME_END).subscribe(this.handleGameEnd);
  };

  handleGameUpdate = newStats => {
    this.setState(newStats);
  };

  handleGameEnd = message => {
    this.socket.close();
    this.props.removeGame(message);
  };

  flipCard = word => {
    this.socket.emit(EVENT.CARD_FLIP, word);
  };

  getMyPlayer = () => {
    return this.state.players.find(
      player => player.username === this.state.username
    );
  };

  getCurrentPlayer = () => {
    return this.state.players.find(player => player.canPlay);
  };

  getFlipStatus = key => {
    if (!this.state.flippedIndices.includes(key)) {
      return FLIP_STATUS.DEFAULT;
    } else {
      return this.state.matches[key]
        ? FLIP_STATUS.MATCHED
        : FLIP_STATUS.FLIPPED;
    }
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
            {!myPlayer.canPlay ? 'Wait for your turn' : 'Your turn'}
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
                hiddenValue={word.value}
                flipStatus={this.getFlipStatus(word.key)}
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
