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

  spielerNameChanged(spieler,name) {
    this.props.data[spieler]=name;
    this.emitStateChanged();
  }

  render() {
    const playerCount=this.props.data.fuenfspieler ? 5 : 4;
    var players = [];
    for (var i = 1; i <= playerCount; i++) {
      const playerVar='spieler'+i;
      players.push(
          <div key={i}>
            <label>{'Spieler '+ i + ': '}</label>
            <input type="text" value={this.props.data[playerVar]} onChange={(event) => this.spielerNameChanged(playerVar,event.target.value)}/>
          </div>
      );
    }

    return (
      <div>
        <h2>
        Spielerauswahl
        </h2>
        <div>
          <input type="checkbox" name="spieler" value="4" checked={!this.props.data.fuenfspieler} onChange={() => this.anzahlSpielerChanged(false)}/> 4 Spieler
          <input type="checkbox" name="spieler" value="5" checked={this.props.data.fuenfspieler} onChange={() => this.anzahlSpielerChanged(true)}/> 5 Spieler
        </div>
        {players}

        <div>
          <Link to="main">Back</Link>
        </div>
      </div>
    );
  }
}
