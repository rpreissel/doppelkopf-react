
export default class Spiel {

  constructor(gewinner = null,aussetzer = null ,spielwert = null) {
    this.gewinner=gewinner ? gewinner : [];
    this.aussetzer=aussetzer ? aussetzer : -1;
    this.spielwert=spielwert ? spielwert : 0;
    this.punkte=[0,0,0,0,0];
    if(spielwert!==0) {
      this.berechnePunkte();
    }
  }

  berechnePunkte() {
    this.punkte=[0,0,0,0,0];

    let verlierer = [];
    for(let i=0;i<5;i++) {
      if(i !== this.aussetzer && this.gewinner.indexOf(i)<0) {
        verlierer.push(i);
      }
    }

    if(this.gewinner.length === 1) {
      //Solo gewonnen
      for(let g in this.gewinner) {
        this.punkte[this.gewinner[g]]=this.spielwert*3;
      }

      for(let g in verlierer) {
        this.punkte[verlierer[g]]=-this.spielwert;
      }

    } else if(this.gewinner.length === 3) {
      //Solo verloren
      for(let g in this.gewinner) {
        this.punkte[this.gewinner[g]]=this.spielwert;
      }

      for(let g in verlierer) {
        this.punkte[verlierer[g]]=-3*this.spielwert;
      }
    } else {
      //Normales Spiel
      for(let g in this.gewinner) {
        this.punkte[this.gewinner[g]]=this.spielwert;
      }

      for(let g in verlierer) {
        this.punkte[verlierer[g]]=-this.spielwert;
      }
    }


  }
}
