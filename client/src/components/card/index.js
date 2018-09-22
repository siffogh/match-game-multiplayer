import style from "./style.css";

export default function Card({ front, back, isFlipped, match, onClick }) {
  if (Boolean(match)) {
    return (
      <div class={style.card} data-isFlipped={true}>
        <div
          class={style.match}
          style={{ background: match.username.toLowerCase() }}
        />
      </div>
    );
  }

  return (
    <div class={style.card} data-isFlipped={isFlipped}>
      <div class={style.front} onClick={onClick}>
        {front}
      </div>
      <div class={style.back}>{back}</div>
    </div>
  );
}
