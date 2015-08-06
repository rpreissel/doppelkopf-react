import React from 'react';
import {Link} from 'react-router';


export default class Ergebnis extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <h2>
          Spielverlauf
        </h2>

        <div>
          <table>
            <thead>
              <tr>
                <th>Nr.</th>
                {this.props.data.spieler.map((spieler, id) => {
                  return <th key={id}>{spieler}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {this.props.data.spiele.map((spiel,spielIndex) => {
                return <tr key={spielIndex}>
                  <td>{spielIndex+1}</td>
                  {this.props.data.spielerIds.map((spielerId) => {
                    return <td key={spielerId}>{this.props.data.spielstandForSpielerAndSpiel(spielerId,spielIndex)}</td>
                  })}
                </tr>
              })}
            </tbody>
          </table>
        </div>
        <div>
          <Link to="main">Zurück</Link>
        </div>
      </div>
    );
  }
}
