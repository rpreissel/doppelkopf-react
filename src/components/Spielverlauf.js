import React from 'react';
import {Link} from 'react-router';
import {Panel} from 'react-bootstrap';
import ErgebnisTabelle from './ErgebnisTabelle';
import SpielEingabe from './SpielEingabe';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions//ActionCreators';

import * as SpieleStore from '../reducers/games';
import * as PlayersStore from '../reducers/players';


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
            <SpielEingabe spieler={this.props.players} mitAussetzer={this.props.fuenfSpieler} onSpielAbrechnen={this.props.actions.addSpiel}/>
          </div>
        </Panel>

        <Panel header={ergebnisTitle} bsStyle='info'>
          <div>
            <ErgebnisTabelle players={this.props.players} spiele={this.props.spiele} spielstandForSpielerAndSpiel={this.props.spielstandForSpielerAndSpiel}/>
          </div>
        </Panel>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    players:                      PlayersStore.getPlayers(state.players),
    spiele:                       state.games.get('results'),
    fuenfSpieler:                 state.players.get('fuenfSpieler'),
    spielstandForSpielerAndSpiel: (spielerId, spielIndex) => SpieleStore.getSpielstandForSpielerAndSpiel(state.games,spielerId,spielIndex)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Spielverlauf);
