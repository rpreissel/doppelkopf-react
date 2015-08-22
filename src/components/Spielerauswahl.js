import React from 'react';
import {Link} from 'react-router';
import {Panel,ButtonToolbar,Button,} from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/ActionCreators';

import * as DoppelkopfspielStore from '../reducers/doppelkopfspiel';


class Spielerauswahl extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const title = (
      <h3>Spielerauswahl</h3>
    );
    const adminTitle = (
      <h3>Administration</h3>
    );

    return (
      <div>
        <Panel header={title} bsStyle='info'>
          <div className="form-group">
            <label className="checkbox-inline">
              <input type="checkbox" name="spieler" value="4" checked={!this.props.fuenfSpieler} onChange={() => this.props.actions.fuenfSpielerModusAendern(false)}/> 4 Spieler
            </label>
            <label className="checkbox-inline">
              <input type="checkbox" name="spieler" value="5" checked={this.props.fuenfSpieler} onChange={() => this.props.actions.fuenfSpielerModusAendern(true)}/> 5 Spieler
            </label>
          </div>
          <div className="form-inline form-group">
          {
            this.props.spieler.map((name,id)=> {
              return <div className="form-group" key={id}>
                <label className="player-label">{'Spieler '+ (id+1) + ': '}</label>
                <input className="form-control player-input" type="text" value={name} onChange={(event) => this.props.actions.spielerUmbenennen(id,event.target.value)}/>
              </div>
            })
          }
          </div>

          <div>
            <Link className="btn btn-primary" to="verlauf">Zum Spiel</Link>
          </div>
        </Panel>
        <Panel header={adminTitle} bsStyle='warning'>
          <div>
            <ButtonToolbar>
              <Button bsStyle='danger' onClick={this.props.actions.storageLoeschen}>Storage löschen</Button>
            </ButtonToolbar>
          </div>
        </Panel>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    spieler:      DoppelkopfspielStore.getSpieler(state.doppelkopfspiel),
    fuenfSpieler: state.doppelkopfspiel.get('fuenfSpieler')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Spielerauswahl);