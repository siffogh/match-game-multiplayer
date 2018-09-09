import {Component} from 'preact';
import io from 'socket.io-client';


import Card from '../../components/card';
import Feedback from '../../components/feedback';
import style from './style';
import {BASE_URL, post} from '../../request';

const getWords = data => {
	const words = data.reduce((arr, row) => [...arr, ...row], []);
	return words;
};

export default class Game extends Component {

	state = {
		flippedCardIdx: null,
		grid: [],
		score: 0,
		matches: {},
		isLoaded: false,
		error: null
	}

	constructor(props) {
		super(props);
		this.socket = null;
	}

	async componentDidMount() {
		try {
			const res = await post('game-data', { token: this.props.token});
			const stats = await res.json();
			this.setState({...stats, isLoaded: true}, () => {
				this.initSocket();
			});
		} catch(e) {
			const error = await e.json();
			this.setState({error: error.message, isLoaded: true});
		}
	}

	initSocket = () => {
		this.socket = io(BASE_URL, {path: `/${this.props.token}`});
		this.socket.on('flipped', newStats => {
			this.setState(newStats);
		});
	}

	handleFlip = idx => {
		this.setState({flippedCardIdx: idx});
		this.socket.emit('flip', idx);
	}

	render(props, {error, score, isLoaded, grid, flippedCardIdx, matches}) {
		if(error) {
			return <div class={style.game}>
				<Feedback message={error} emoji='😕'/>
			</div>;
		}
		
		if (score === 6) {
			this.socket.close();
			return <div class={style.game}>
				<Feedback message='You won!' emoji='🎉'/>
			</div>;
		}

		if(!isLoaded) {
			return <Feedback message='Loading...'/>;
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
