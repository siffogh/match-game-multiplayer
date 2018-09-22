import style from "./style.css";

export default function Card({
  front,
  back,
  isFlipped,
  match,
  onClick,
  disabled
}) {
  if (Boolean(match)) {
    return (
      <div class={style.card} data-isFlipped={true}>
        <button
          class={style.match}
          style={{ background: match.color }}
          disabled
        />
      </div>
    );
  }

  return (
    <div class={style.card} data-isFlipped={isFlipped}>
      <button class={style.front} onClick={onClick} disabled={disabled}>
        {front}
      </button>
      <div class={style.back}>{back}</div>
    </div>
  );
}
