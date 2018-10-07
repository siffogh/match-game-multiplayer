export const LOAD_STATUS = {
  LOADED: 'LOADED',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  WIN: 'WIN',
  LOSS: 'LOSS',
  TIE: 'TIE',
  TIMEOUT: 'TIMEOUT'
};

export const DISCONNECT_ERROR =
  'Sorry, the game was closed due to a connection problem with the server.';

export const DISCONNECT_REASON = {
  TIMEOUT: 'ping timeout',
  WIN: 'io server disconnect'
};
