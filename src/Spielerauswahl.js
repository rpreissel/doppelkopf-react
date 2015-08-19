import React from 'react';
import {Link} from 'react-router';
import {Panel} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from './actions//ActionCreators';
import * as PlayersStore from './reducers/players';


class Spielerauswahl extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const title = (
      <h3>Spielerauswahl</h3>
    );

    return (
      <div>
        <Panel header={title} bsStyle='info'>
          <div className="form-group">
            <label className="checkbox-inline">
              <input type="checkbox" name="spieler" value="4" checked={!this.props.fuenfSpieler} onChange={() => this.props.actions.toggleFivePlayers(false)}/> 4 Spieler
            </label>
            <label className="checkbox-inline">
              <input type="checkbox" name="spieler" value="5" checked={this.props.fuenfSpieler} onChange={() => this.props.actions.toggleFivePlayers(true)}/> 5 Spieler
            </label>
          </div>
          <div className="form-inline form-group">
          {
            this.props.players.map((name,id)=> {
              return <div className="form-group" key={id}>
                <label className="player-label">{'Spieler '+ (id+1) + ': '}</label>
                <input className="form-control player-input" type="text" value={name} onChange={(event) => this.props.actions.renamePlayer(id,event.target.value)}/>
              </div>
            })
          }
          </div>

          <div>
            <Link className="btn btn-primary" to="verlauf">Zum Spiel</Link>
          </div>

        </Panel>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    players:      PlayersStore.getPlayers(state.players),
    fuenfSpieler: state.players.get('fuenfSpieler')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Spielerauswahl);
