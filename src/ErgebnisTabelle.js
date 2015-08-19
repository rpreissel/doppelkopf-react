import React from 'react';
import {Link} from 'react-router';
import {Table} from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './actions//ActionCreators';

import * as SpieleStore from './reducers/games';
import * as PlayersStore from './reducers/players';


class ErgebnisTabelle extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Table striped bordered condensed responsive>
        <thead>
        <tr>
          <th className="text-center">Nr.</th>
          {this.props.players.map((spieler, id) => {
            return <th className="text-center" key={id}>{spieler}</th>
          })}
        </tr>
        </thead>
        <tbody>
        {this.props.spiele.map((spiel, spielIndex) => {
          return <tr className="text-center" key={spielIndex}>
            <td>{spielIndex + 1}</td>
            {this.props.players.map((spieler,spielerId) => {
              return (<td className="text-center"
                         key={spielerId}>{this.props.spielstandForSpielerAndSpiel(spielerId, spielIndex)}</td>);
            })}
          </tr>
        })}
        </tbody>
      </Table>
    );
  }
}

function mapStateToProps(state) {
  return {
    players:                      PlayersStore.getPlayers(state.players),
    spiele:                       state.games.get('results'),
    spielstandForSpielerAndSpiel: (spielerId, spielIndex) => SpieleStore.getSpielstandForSpielerAndSpiel(state.games,spielerId,spielIndex)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErgebnisTabelle);
