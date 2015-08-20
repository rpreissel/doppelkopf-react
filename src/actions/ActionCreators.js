import ActionTypes from '../constants/ActionTypes';
import DoppelkopfStorage from '../util/DoppelkopfStorage'

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

export function spielAustauschen(neuesSpiel) {
  return {
    type:       ActionTypes.SPIEL_AUSTAUSCHEN,
    neuesSpiel: neuesSpiel
  }
}

export function spielZuruecksetzen() {
  return {
    type: ActionTypes.SPIEL_ZURUECKSETZEN
  }
}

export function spielVomStorageLaden() {
  return (dispatch, getState) => {

    DoppelkopfStorage.readFromLocalStorage((aktuellesSpiel) => {
      if(aktuellesSpiel) {
        dispatch(spielAustauschen(aktuellesSpiel));
      }
    });
  };
}

export function storageLoeschen() {
  return (dispatch, getState) => {

    DoppelkopfStorage.deleteLocalStorage(() => {
      dispatch(spielZuruecksetzen());
    });
  };
}

export function spielInStorageSpeichern() {
  return (dispatch, getState) => {

    DoppelkopfStorage.saveToLocalStorage(getState().doppelkopfspiel,(success) => {
    });
  };
}

export function toggleGewinner(gewinner) {
  return {
    type:     ActionTypes.TOGGLE_GEWINNER,
    gewinner: gewinner
  };
}

export function toggleAussetzer(aussetzer) {
  return {
    type:      ActionTypes.TOGGLE_AUSSETZER,
    aussetzer: aussetzer
  };
}

export function spielwertAendern(spielwert) {
  return {
    type:      ActionTypes.SPIELWERT_AENDERN,
    spielwert: spielwert
  };
}