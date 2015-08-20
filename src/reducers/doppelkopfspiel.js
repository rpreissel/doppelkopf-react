import * as ActionTypes from '../constants/ActionTypes';
import Immutable from 'immutable';


const initialState = Immutable.fromJS({
  spieler:      ['Spieler1','Spieler2','Spieler3','Spieler4','Spieler5'],
  fuenfSpieler: false,
  spiele:       [],
  bockrunden1:  0,
  bockrunden2:  0
});

export default function handle(state=initialState, action=null) {
  switch (action.type) {
    case ActionTypes.SPIEL_ABRECHNEN:
      return _addSpiel(state,action.gewinner,action.aussetzer,action.spielwert,action.bockrunden);
    case ActionTypes.SPIELER_UMBENENNEN:
      return state.update('spieler', list => list.set(action.spielerId,action.name));
    case ActionTypes.FUENF_SPIELER_MODUS_AENDERN:
      return state.set('fuenfSpieler', action.fuenfSpieler);
    case ActionTypes.SPIEL_AUSTAUSCHEN:
      return initialState.merge(action.neuesSpiel);
    case ActionTypes.SPIEL_ZURUECKSETZEN:
      return initialState;
    case ActionTypes.LETZTES_SPIEL_AENDERN:
      if(state.get('spiele').last() === action.spiel) {
        return state.update('spiele', list => list.butLast());
      }
      return state;
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

export function getDoppelbockSpiele(state) {
  return state.get('bockrunden2');
}

export function getBockSpiele(state) {
  return state.get('bockrunden1')-state.get('bockrunden2');
}


export function getSpielstandFuerSpielerAndSpiel(state,spielerId,bisSpiel) {
  const spielwert = state.get('spiele').slice(0,bisSpiel+1).reduce((result,spiel) => {
    return result + spiel.get('punkte').get(spielerId);
  },0);

  const gewinner = state.get('spiele').get(bisSpiel).get('gewinner').indexOf(spielerId)>=0;
  const aussetzer = state.get('spiele').get(bisSpiel).get('aussetzer') === spielerId;

  return {
    spielwert: spielwert,
    gewinner:  gewinner,
    aussetzer: aussetzer
  };
}



function _addSpiel (state,gewinner,aussetzer,spielwert,bockrunden) {

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

  let bockrunden1 = state.get('bockrunden1');
  let bockrunden2 = state.get('bockrunden2');

  let bockmodus=0;
  if(bockrunden1>0) {
    bockrunden1--;
    bockmodus++;
  }

  if(bockrunden2>0) {
    bockrunden2--;
    bockmodus++;
  }

  let neuesSpiel=Immutable.fromJS({
    gewinner:   gewinner,
    aussetzer:  aussetzer,
    spielwert:  spielwert,
    bockrunden: bockrunden,
    bockmodus:  bockmodus,
    punkte:     punkte
  })

  state = state.update('spiele', list => list.push(neuesSpiel));

  let anzahlbockspiele=state.get('fuenfSpieler') ? 5 : 4;
  for(let i=0;i<bockrunden;i++) {
    let temp=bockrunden1;
    bockrunden1=bockrunden2+anzahlbockspiele;
    bockrunden2=temp;
  }
  return state.set('bockrunden1',bockrunden1).set('bockrunden2',bockrunden2);
}



