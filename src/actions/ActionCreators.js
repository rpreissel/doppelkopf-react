import ActionTypes from '../constants/ActionTypes';

export function spielerUmbenennen(spielerId, name) {
  return {
    type:      ActionTypes.SPIELER_UMBENENNEN,
    spielerId: spielerId,
    name:      name
  };
}

export function fuenfSpielerModusAendern(fuenfSpieler) {
  return {
    type:         ActionTypes.FUENF_SPIELER_MODUS_AENDERN,
    fuenfSpieler: fuenfSpieler
  };
}

export function spielAbrechnen(gewinner,aussetzer,spielwert) {
  return {
    type:      ActionTypes.SPIEL_ABRECHNEN,
    gewinner:  gewinner,
    aussetzer: aussetzer,
    spielwert: spielwert
  };
}