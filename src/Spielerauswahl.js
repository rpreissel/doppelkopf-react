import React from 'react';
import {Link} from 'react-router';


export default class Spielerauswahl extends React.Component {
  constructor(props) {
    super(props);

  }

  emitStateChanged() {
    this.props.onStateChanged();
  }

  anzahlSpielerChanged(fuenfspieler) {
    this.props.data.fuenfspieler=fuenfspieler;
    this.emitStateChanged();
  }

  spielerNameChanged(spielerId,name) {
    this.props.data.changeSpielerWithId(spielerId,name);
    this.emitStateChanged();
  }

  render() {
    return (
      <div>
        <h2>
        Spielerauswahl
        </h2>
        <div>
          <input type="checkbox" name="spieler" value="4" checked={!this.props.data.fuenfspieler} onChange={() => this.anzahlSpielerChanged(false)}/> 4 Spieler
          <input type="checkbox" name="spieler" value="5" checked={this.props.data.fuenfspieler} onChange={() => this.anzahlSpielerChanged(true)}/> 5 Spieler
        </div>
        {
          this.props.data.spieler.map((name,id)=> {
            return <div key={id}>
              <label>{'Spieler '+ (id+1) + ': '}</label>
              <input type="text" value={name} onChange={(event) => this.spielerNameChanged(id,event.target.value)}/>
            </div>
          })
        }

        <div>
          <Link to="ergebnis">Starte Spiel</Link>
        </div>
      </div>
    );
  }
}
