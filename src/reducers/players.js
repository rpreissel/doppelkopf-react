import { RENAME_PLAYER } from '../constants/ActionTypes';

export default function handle(state={}, action=null) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case RENAME_PLAYER:
      console.log('Rename player');
      return newState;

    default:
      return state;
  }
}