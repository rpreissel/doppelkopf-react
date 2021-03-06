import React from 'react';
import {Link} from 'react-router';
import {Table} from 'react-bootstrap';


export default class ErgebnisTabelle extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Table striped bordered condensed responsive>
        <thead>
        <tr>
          <th className="text-center">Nr.</th>
          {this.props.data.spieler.map((spieler, id) => {
            return <th className="text-center" key={id}>{spieler}</th>
          })}
        </tr>
        </thead>
        <tbody>
        {this.props.data.spiele.map((spiel, spielIndex) => {
          return <tr className="text-center" key={spielIndex}>
            <td>{spielIndex + 1}</td>
            {this.props.data.spielerIds.map((spielerId) => {
              return (<td className="text-center"
                         key={spielerId}>{this.props.data.spielstandForSpielerAndSpiel(spielerId, spielIndex)}</td>);
            })}
          </tr>
        })}
        </tbody>
      </Table>
    );
  }
}
