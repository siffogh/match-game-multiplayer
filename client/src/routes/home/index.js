import {Component} from 'preact';

import Button from '../../components/button';
import Feedback from '../../components/feedback';
import {get} from '../../request'; 
import { route } from 'preact-router';
import style from './style';

export default class Home extends Component {
  state = {
    isLoaded: true,
    error: null
  };

  handleStartGame = async () => {
    this.setState({isLoaded: false}, async() => {
      try {
        const res = await get('create-game');
        const { token } = await res.json();
        route(`/game/${token}`);
      } catch(e) {
        const error = await e.json();
        this.setState({isLoaded: true, error: error.message});
      }
    });
  };

  render(props, {isLoaded, error}) {
		if(error) {
			return <div class={style.game}>
				<Feedback message={error} emoji='😕'/>
			</div>;
		}

		if(!isLoaded) {
			return <Feedback message='Loading...'/>;
		}

    return (
      <div class={style.home}>
        <div>
          <Button onClick={this.handleStartGame}>New Game</Button>
        </div>
      </div>
    );
  }
}
