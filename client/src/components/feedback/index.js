import Button from '../button';
import style from './style';

export default function Feedback({message, emoji}) {
  return (
		<div class={style.feedback}>
			<div class={style.emoji}>{emoji}</div>
			<div class={style.
				message}>{message}</div>
		</div>
  );
}