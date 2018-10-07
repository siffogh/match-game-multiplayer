import { Component } from 'preact';

import Button from '../../components/button';
import style from './style.css';

export default class Home extends Component {
  /**
   * renders the default welcome content
   */
  renderWelcomeContent = () => {
    return (
      <div class={style.head}>
        <h2>Match Game</h2>
        <img src="/assets/logo.png" alt="match game logo" height="50" />
      </div>
    );
  };

  /**
   * renders the content for a given feedback message
   */
  renderFeedbackContent = ({ message, emoji }) => {
    return (
      <div class={style.head}>
        <div class={style.emoji}>{emoji} </div>
        <div> {message} </div>
      </div>
    );
  };

  render({ feedback, startGame }) {
    // either render the welcome page content or some feedback message (i.e. error, winning...)
    const homeContent = !feedback
      ? this.renderWelcomeContent()
      : this.renderFeedbackContent(feedback);

    return (
      <div class={style.home}>
        {homeContent}
        <Button onClick={startGame}>New Game</Button>
      </div>
    );
  }
}
