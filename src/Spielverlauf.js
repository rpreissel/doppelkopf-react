import React from 'react';
import {Link} from 'react-router';
import {Panel} from 'react-bootstrap';
import ErgebnisTabelle from './ErgebnisTabelle';
import SpielEingabe from './SpielEingabe';


export default class Spielverlauf extends React.Component {
  constructor(props) {
    super(props);

  }

  emitStateChanged() {
    this.props.onStateChanged();
  }

  spielAbrechnen(spiel) {
    this.props.data.addSpiel(spiel);
    this.emitStateChanged();
  }

  render() {
    const ergebnisTitle = (
      <h3>Spielverlauf</h3>
    );

    const aktionTitle = (
      <h3>Aktionen</h3>
    );

    const eingabeTitle = (
      <h3>Eingabe</h3>
    );

    return (
      <div>
        <Panel header={aktionTitle} bsStyle='info'>
          <div>
            <Link className="btn btn-primary" to="main">Spieler ändern</Link>
          </div>
        </Panel>

        <Panel header={eingabeTitle} bsStyle='info'>
          <div>
            <SpielEingabe spieler={this.props.data.spieler} mitAussetzer={this.props.data.fuenfspieler} onSpielAbrechnen={(spiel) => this.spielAbrechnen(spiel)}/>
          </div>
        </Panel>

        <Panel header={ergebnisTitle} bsStyle='info'>
          <div>
            <ErgebnisTabelle data={this.props.data}/>
          </div>
        </Panel>
      </div>
    );
  }
}
