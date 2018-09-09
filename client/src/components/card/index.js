import { Component } from 'preact';

import style from './style.css';

export default class Card extends Component {
  render(props) {
  	const { front, back } = props;
  	return (<div class={style.card} data-isFlipped={props.isFlipped} data-isDisabled={props.isDisabled}>
    <div class={style.front} onClick={this.props.onClick}>{front}</div>
  		<div class={style.back}>{back}</div>
  	</div>);
  }
}
