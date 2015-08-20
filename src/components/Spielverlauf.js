import React from 'react';
import {Link} from 'react-router';
import {Panel} from 'react-bootstrap';
import ErgebnisTabelle from './ErgebnisTabelle';
import SpielEingabe from './SpielEingabe';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions//ActionCreators';

import * as DoppelkopfspielStore from '../reducers/doppelkopfspiel';


class Spielverlauf extends React.Component {
  constructor(props) {
    super(props);

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
            <SpielEingabe spieler={this.props.spieler} spieleingabe={this.props.spieleingabe} actions={this.props.actions}/>
          </div>
        </Panel>

        <Panel header={ergebnisTitle} bsStyle='info'>
          <div>
            <ErgebnisTabelle spieler={this.props.spieler} spiele={this.props.spiele} spielstandFuerSpielerAndSpiel={this.props.spielstandFuerSpielerAndSpiel}/>
          </div>
        </Panel>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    spieler:                       DoppelkopfspielStore.getSpieler(state.doppelkopfspiel),
    spiele:                        state.doppelkopfspiel.get('spiele'),
    fuenfSpieler:                  state.doppelkopfspiel.get('fuenfSpieler'),
    spielstandFuerSpielerAndSpiel: (spielerId, spielIndex) => DoppelkopfspielStore.getSpielstandFuerSpielerAndSpiel(state.doppelkopfspiel,spielerId,spielIndex),
    spieleingabe:                  state.spieleingabe
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Spielverlauf);
