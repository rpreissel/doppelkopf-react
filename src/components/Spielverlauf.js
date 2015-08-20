import React from 'react';
import {Link} from 'react-router';
import {Panel,ButtonToolbar,Button} from 'react-bootstrap';
import ErgebnisTabelle from './ErgebnisTabelle';
import SpielEingabe from './SpielEingabe';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/ActionCreators';

import * as DoppelkopfspielStore from '../reducers/doppelkopfspiel';


class Spielverlauf extends React.Component {
  static contextTypes = {
    router: React.PropTypes.any.isRequired
  };

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
      <h3>Eingabe ({this.props.doppelbockspiele} Doppelbock- / {this.props.bockspiele} Bockspiele)</h3>
    );

    return (
      <div>
        <Panel header={aktionTitle} bsStyle='info'>
          <ButtonToolbar>
            <Button bsStyle='primary' disabled={!this.props.spiele.count()>0} onClick={() => this.props.actions.letztesSpielAendern(this.props.spiele.last())}>Letztes Spiel ändern</Button>
            <Button bsStyle='primary' disabled={!this.props.spiele.count()>0} onClick={() => this.context.router.transitionTo('main')}>Einstellungen</Button>
          </ButtonToolbar>
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
    spieleingabe:                  state.spieleingabe,
    bockspiele:                    DoppelkopfspielStore.getBockSpiele(state.doppelkopfspiel),
    doppelbockspiele:              DoppelkopfspielStore.getDoppelbockSpiele(state.doppelkopfspiel)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Spielverlauf);
