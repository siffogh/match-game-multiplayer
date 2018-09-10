/* eslint react/sort-comp: 0 */

import { Component, render } from 'preact';
import io from 'socket.io-client';


import Card from '../../components/card';
import Feedback from '../../components/feedback';

import style from './style';
import { BASE_URL, post } from '../../request';
import { route } from 'preact-router';

const LOAD_STATUS = {
	LOADED: 0,
	LOADING: 1,
	ERROR: 2
};


function getWords(data) {
	const words = data.reduce((arr, row) => [...arr, ...row], []);
	return words;
}

export default class Game extends Component {

	state = {
		flippedCardIdx: null,
		grid: [],
		score: 0,
		matches: {},
		load: { status: LOAD_STATUS.LOADING, message: null }
	}

	constructor(props) {
		super(props);
		this.socket = null;
	}

	async componentDidMount() {
		this.loadGameData(this.props.token);
	}

	loadGameData = async(token) => {
		try {
			const res = await post('game-data', { token });
			const stats = await res.json();
			this.setState({ ...stats, load: { status: LOAD_STATUS.LOADED } }, () => {
				this.initSocket();
			});
		}
		catch (e) {
			const { message } = await e.json();
			this.setState({ load: { status: LOAD_STATUS.ERROR, message } });
		}
	}

	handleGameStart = token => {
		route(`/game/${token}`);
		this.loadGameData(token);
	}

	initSocket = () => {
		this.socket = io(BASE_URL, { path: `/${this.props.token}` });
		this.socket.on('flipped', newStats => {
			this.setState(newStats);
		});
	}

	handleFlip = idx => {
		this.setState({ flippedCardIdx: idx });
		this.socket.emit('flip', idx);
	}

	render(_, { load, score, grid, flippedCardIdx, matches }) {
		if (load.status === LOAD_STATUS.LOADING) {
			return <div class={style.game}><div>Loading...</div></div>;
		}

		if (load.status === LOAD_STATUS.ERROR) {
			return (
				<Feedback onGameStart={this.handleGameStart}>
					<div class="emoji">😕</div>
					<div class={style.message}>{load.message}</div>
				</Feedback>
			);
		}

		if (score === 6) {
			return (
				<Feedback onGameStart={this.handleGameStart}>
					<div class="emoji">🎉</div>
					<div> Congratulations!</div>
					<div> You won!</div>
				</Feedback>
			);
		}

		return (
			<div class={style.game}>
				<div class={style.header}>Score: {this.state.score}</div>
				<main class={style.body}>
					<div class={style.grid}>
						{
							getWords(grid).map((word, idx) => (
								<Card front={'?'} back={word} isFlipped={idx === flippedCardIdx} isDisabled={matches[idx] || false} onClick={() => this.handleFlip(idx)} />
							))
						}
					</div>
				</main>
			</div>
		);
	}

}
