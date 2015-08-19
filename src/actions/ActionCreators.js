import ActionTypes from '../constants/ActionTypes';

export function renamePlayer(playerId, name) {
  return {
    type:     ActionTypes.RENAME_PLAYER,
    playerId: playerId,
    name:     name
  };
}

export function toggleFivePlayers(fivePlayers) {
  return {
    type:        ActionTypes.TOGGLE_FIVE_PLAYERS,
    fivePlayers: fivePlayers,
  };
}