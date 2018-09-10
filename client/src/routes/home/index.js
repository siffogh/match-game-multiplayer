import Feedback from '../../components/feedback';

import { route } from 'preact-router';


function handleGameStart(token) {
	return route(`game/${token}`);
}

export default function Home() {
	return (
		<Feedback onGameStart={handleGameStart}>
			<h1>Home</h1>
		</Feedback>
	);
}
