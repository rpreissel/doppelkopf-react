import { ADD_GAME } from '../constants/ActionTypes';
import Immutable from 'immutable';


const initialState = Immutable.Map({
  results: Immutable.List.of()
});


function _addGame (state,gewinner,aussetzer,spielwert) {

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

  return state.update('results', list => list.push(neuesSpiel));
}

export default function handle(state, action) {
  if (typeof state === 'undefined') {
    return _addGame(initialState,[0,1],4,5);
  }

  switch (action.type) {
    case ADD_GAME:
      return _addGame(state,action.gewinner,action.aussetzer,action.spielwert);
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

export function getSpielstandForSpielerAndSpiel(state,spielerId,bisSpiel) {
  return state.get('results').slice(0,bisSpiel+1).reduce((result,spiel) => {
    return result + spiel.get('punkte').get(spielerId);
  },0);
}
