import Immutable from 'immutable';

export default class DoppelkopfStorage {
  constructor() {

  }

  static readFromLocalStorage(cb) {
    const aktuellesSpiel = localStorage.getItem('aktuellesSpiel');
    if(aktuellesSpiel) {
      cb(Immutable.fromJS(JSON.parse(aktuellesSpiel)));
    } else {
      cb(null);
    }
  }

  static saveToLocalStorage(doppelkopfspiel,cb) {
    localStorage.setItem('aktuellesSpiel', JSON.stringify(doppelkopfspiel.toJS()));
    cb(true);
  }

  static deleteLocalStorage(cb) {
    localStorage.clear();
    cb();
  }
}