
export default class DoppelkopfData {
  constructor() {
    this.fuenfspieler=false;
    this.spieler1='Spieler1';
    this.spieler2='Spieler2';
    this.spieler3='Spieler3';
    this.spieler4='Spieler4';
    this.spieler5='Spieler5';
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

  get spieler() {
    return this.spielerIds.map((id) => this.spielerWithId(id));
  }
}
