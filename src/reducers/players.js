import { RENAME_PLAYER,TOGGLE_FIVE_PLAYERS } from '../constants/ActionTypes';
import Immutable from 'immutable';


const initialState = Immutable.Map({
  names:        Immutable.List.of('Spieler1','Spieler2','Spieler3','Spieler4','Spieler5'),
  fuenfSpieler: false
});

export default function handle(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case RENAME_PLAYER:
      return state.update('names', list => list.set(action.playerId,action.name));
    case TOGGLE_FIVE_PLAYERS:
      return state.set('fuenfSpieler', action.fivePlayers);
    default:
      return state;
  }
}

export function getPlayers(state) {
  if(state.get('fuenfSpieler')) {
    return state.get('names');
  }

  return state.get('names').butLast();
}
