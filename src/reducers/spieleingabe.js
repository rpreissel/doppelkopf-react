import * as ActionTypes from '../constants/ActionTypes';
import Immutable from 'immutable';


const initialStateVierSpieler = Immutable.fromJS({
  gewinner:        [false,false,false,false,false],
  toggleGewinner:  [true,true,true,true,false],
  aussetzer:       [false,false,false,false,false],
  toggleAussetzer: [false,false,false,false,false],
  spielwert:       0,
  abrechenbar:     false,
  fuenfSpieler:    false,
  bockrunden:      0
});

const initialStateFuenfSpieler = Immutable.fromJS({
  gewinner:        [false,false,false,false,false],
  toggleGewinner:  [true,true,true,true,true],
  aussetzer:       [false,false,false,false,false],
  toggleAussetzer: [true,true,true,true,true],
  spielwert:       0,
  abrechenbar:     false,
  fuenfSpieler:    true,
  bockrunden:      0
});

export default function handle(state=initialStateVierSpieler, action=null) {
  switch (action.type) {
    case ActionTypes.SPIEL_ZURUECKSETZEN:
      return initialStateVierSpieler;

    case ActionTypes.SPIEL_ABRECHNEN:
      if(state.get('fuenfSpieler')) {
        const letzerAussetzer=state.get('aussetzer').indexOf(true);
        if(letzerAussetzer>=0) {
          const naechsterAussetzer = (letzerAussetzer + 1) % 5;
          return initialStateFuenfSpieler.update('aussetzer', list => list.set(naechsterAussetzer,true));
        }

        return initialStateFuenfSpieler
      }
      return initialStateVierSpieler;

    case ActionTypes.SPIEL_AUSTAUSCHEN:
      if(action.neuesSpiel.get('fuenfSpieler')) {
        return initialStateFuenfSpieler
      }
      return initialStateVierSpieler;

    case ActionTypes.FUENF_SPIELER_MODUS_AENDERN:
      return _updateAussetzerToggleUndAbrechenbarState(state.set('fuenfSpieler', action.fuenfSpieler));

    case ActionTypes.TOGGLE_GEWINNER:
      if(!state.get('toggleGewinner').get(action.gewinner)) {
        return state;
      }

      state=state.update('gewinner', list => list.update(action.gewinner,v => !v));
      return _updateAussetzerToggleUndAbrechenbarState(state);

    case ActionTypes.TOGGLE_AUSSETZER:
      if(!state.get('toggleAussetzer').get(action.aussetzer)) {
        return state;
      }

      state=state.update('aussetzer', list => list.map((v,k) => (action.aussetzer === k ? !v : false)));
      return _updateAussetzerToggleUndAbrechenbarState(state);

    case ActionTypes.SPIELWERT_AENDERN:
      if(action.spielwert<0) {
        return state;
      }

      return state.set('spielwert',action.spielwert);
    case ActionTypes.BOCKRUNDE_HINZUFUEGEN:
      return state.update('bockrunden', runden => runden ? runden + 1 : 1);
    case ActionTypes.BOCKRUNDEN_LOESCHEN:
      return state.set('bockrunden',0);
    case ActionTypes.LETZTES_SPIEL_AENDERN:
      return _ersetzeStateDurchLetztesSpiel(state,action.spiel);
    default:
      return state;
  }
}


export function getGewinner(state) {
  return state.get('gewinner').reduce((result,v,k) => {
    if(v) {
      return result.push(k);
    }
    return result;
  }, Immutable.List()).toArray();
}

export function getAussetzer(state) {
  return state.get('aussetzer').indexOf(true);
}

function _updateAussetzerToggleUndAbrechenbarState(state) {

  state=state.update('aussetzer', list => list.map((v,k) => v && !state.get('gewinner').get(k)));

  const anzahlGewinner = state.get('gewinner').reduce((res,gewinner)=> res + (gewinner ? 1:0),0);
  state=state.update('toggleGewinner', list => list.map((v,k) => state.get('gewinner').get(k) || anzahlGewinner<3));

  const fuenfSpieler=state.get('fuenfSpieler');
  state=state.update('toggleAussetzer', list => list.map((v,k) => fuenfSpieler && state.get('gewinner').get(k)===false));

  const aussetzerVorhanden=state.get('aussetzer').some(v => v);

  state=state.set('abrechenbar',anzahlGewinner>0 && (!fuenfSpieler || aussetzerVorhanden));
  
  return state;
}

function _ersetzeStateDurchLetztesSpiel(state,spiel) {
  if(!spiel) {
    return state;
  }

  const gewinnerArray=spiel.get('gewinner');
  const gewinnerList=Immutable.Range(0,5).map((v) => gewinnerArray.indexOf(v)>=0).toList();

  const aussetzer=spiel.get('aussetzer');
  const aussetzerList=Immutable.Range(0,5).map((v) => aussetzer===v).toList();

  state=state.withMutations(map => {
    map.set('spielwert',spiel.get('spielwert')).set('gewinner',gewinnerList)
       .set('aussetzer',aussetzerList).set('bockrunden',spiel.get('bockrunden'));
  });

  return _updateAussetzerToggleUndAbrechenbarState(state);
}
