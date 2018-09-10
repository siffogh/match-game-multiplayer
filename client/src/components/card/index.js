import style from './style.css';

export default function Card({ front, back, isFlipped, isDisabled, onClick }) {
	return (
		<div
			class={style.card}
			data-isFlipped={isFlipped}
			data-isDisabled={isDisabled}
		>
			<div class={style.front} onClick={this.props.onClick}>
				{front}
			</div>
			<div class={style.back}>{back}</div>
		</div>
	);
}
