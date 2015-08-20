import { SPIELER_UMBENENNEN,FUENF_SPIELER_MODUS_AENDERN,SPIEL_ABRECHNEN,SPIEL_AUSTAUSCHEN,SPIEL_ZURUECKSETZEN } from '../constants/ActionTypes';
import Immutable from 'immutable';


const initialState = Immutable.fromJS({
  spieler:      ['Spieler1','Spieler2','Spieler3','Spieler4','Spieler5'],
  fuenfSpieler: false,
  spiele:       []
});

export default function handle(state=initialState, action=null) {
  switch (action.type) {
    case SPIEL_ABRECHNEN:
      return _addSpiel(state,action.gewinner,action.aussetzer,action.spielwert);
    case SPIELER_UMBENENNEN:
      return state.update('spieler', list => list.set(action.spielerId,action.name));
    case FUENF_SPIELER_MODUS_AENDERN:
      return state.set('fuenfSpieler', action.fuenfSpieler);
    case SPIEL_AUSTAUSCHEN:
      return action.neuesSpiel;
    case SPIEL_ZURUECKSETZEN:
      return initialState;
    default:
      return state;
  }
}

export function getSpieler(state) {
  if(state.get('fuenfSpieler')) {
    return state.get('spieler');
  }

  return state.get('spieler').butLast();
}

export function getSpielstandFuerSpielerAndSpiel(state,spielerId,bisSpiel) {
  return state.get('spiele').slice(0,bisSpiel+1).reduce((result,spiel) => {
    return result + spiel.get('punkte').get(spielerId);
  },0);
}

function _addSpiel (state,gewinner,aussetzer,spielwert) {

  let punkte=[0,0,0,0,0];

  let verlierer = [];
  for(let i=0;i<5;i++) {
    if(i !== aussetzer && gewinner.indexOf(i)<0) {
      verlierer.push(i);
    }
  }

  if(gewinner.length === 1) {
    //Solo gewonnen
    for(let g in gewinner) {
      punkte[gewinner[g]]=spielwert*3;
    }

    for(let g in verlierer) {
      punkte[verlierer[g]]=-spielwert;
    }

  } else if(gewinner.length === 3) {
    //Solo verloren
    for(let g in gewinner) {
      punkte[gewinner[g]]=spielwert;
    }

    for(let g in verlierer) {
      punkte[verlierer[g]]=-3*spielwert;
    }
  } else {
    //Normales Spiel
    for(let g in gewinner) {
      punkte[gewinner[g]]=spielwert;
    }

    for(let g in verlierer) {
      punkte[verlierer[g]]=-spielwert;
    }
  }

  let neuesSpiel=Immutable.Map({
    gewinner:  gewinner,
    aussetzer: aussetzer,
    spielwert: spielwert,
    punkte:    Immutable.List(punkte)
  })

  return state.update('spiele', list => list.push(neuesSpiel));
}



