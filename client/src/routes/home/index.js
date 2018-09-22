import Feedback from "../../components/feedback";

export default function Home({ feedback }) {
  return feedback ? (
    <Feedback path="/">
      <div class="emoji">{feedback.emoji} </div>
      <div> {feedback.message} </div>
    </Feedback>
  ) : (
    <Feedback>
      <h2>Match Game</h2>
      <img src="/assets/logo.png" alt="match game logo" height="50" />
    </Feedback>
  );
}
