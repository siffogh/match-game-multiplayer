import Button from "../../components/button";
import style from "./style.css";

export default function Home({ feedback, startGame }) {
  // get the right content based on load status
  const homeContent = !feedback ? (
    <div class={style.head}>
      <h2>Match Game</h2>
      <img src="/assets/logo.png" alt="match game logo" height="50" />
    </div>
  ) : (
    <div class={style.head}>
      <div class="emoji">{feedback.emoji} </div>
      <div> {feedback.message} </div>
    </div>
  );

  return (
    <div class={style.home}>
      {homeContent}
      <Button onClick={this.props.startGame}>New Game</Button>
    </div>
  );
}
