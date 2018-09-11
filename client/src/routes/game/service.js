// ---------
// constants
// ---------
export const LOAD_STATUS = {
	LOADED: 0,
	LOADING: 1,
	ERROR: 2,
	WIN: 3
};

export const DISCONNECT_ERROR = 'Sorry, the game was closed due to a connection problem with the server.';

export const DISCONNECT_REASON = {
	TIMEOUT: 'ping timeout',
	WIN: 'io server disconnect'
};

export function getWords(data) {
	const words = data.reduce((arr, row) => [...arr, ...row], []);
	return words;
}
