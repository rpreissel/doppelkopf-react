import Spiel from './Spiel';

export default class DoppelkopfData {
  constructor() {
    this.fuenfspieler=false;
    this.spieler1='Spieler1';
    this.spieler2='Spieler2';
    this.spieler3='Spieler3';
    this.spieler4='Spieler4';
    this.spieler5='Spieler5';

    this.spiele=[];

    this.spiele.push(new Spiel([1,2,3,4,5]));
    this.spiele.push(new Spiel([5,4,3,2,1]));
  }

  get spielerCount() {
    return this.fuenfspieler ? 5 : 4;
  }

  get spielerIds() {
    const result=[0,1,2,3];
    if(this.fuenfspieler) {
      result.push(4);
    }
    return result;
  }

  spielerWithId(id) {
    return this['spieler'+(id+1)];
  }

  changeSpielerWithId(id,name) {
    this['spieler'+(id+1)]=name;
  }

  spielstandForSpielerAndSpiel(spielerId,spiel) {
    return this.spiele.slice(0,spiel+1).reduce((result,spiel) => {
      return result + spiel.punkte[spielerId];
    },0);
  }

  get spieler() {
    return this.spielerIds.map((id) => this.spielerWithId(id));
  }
}
