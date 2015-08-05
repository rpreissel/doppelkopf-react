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

  render() {
    return (
      <div>
        <h2>
        Spielerauswahl
        </h2>

          <input type="checkbox" name="spieler" value="4" checked={!this.props.data.fuenfspieler} onChange={() => this.anzahlSpielerChanged(false)}/> 4 Spieler
          <input type="checkbox" name="spieler" value="5" checked={this.props.data.fuenfspieler} onChange={() => this.anzahlSpielerChanged(true)}/> 5 Spieler

        <div>
          <Link to="main">Back</Link>
        </div>
      </div>
    );
  }
}
