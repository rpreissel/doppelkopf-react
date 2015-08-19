import ActionTypes from '../constants/ActionTypes';

export function renamePlayer(playerId, name) {
  return {
    playerId: playerId,
    type:     ActionTypes.RENAME_PLAYER,
    name:     name
  };
}