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
          {this.props.spieler.map((spieler, id) => {
            return <th className="text-center" key={id}>{spieler}</th>
          })}
        </tr>
        </thead>
        <tbody>
        {this.props.spiele.map((spiel, spielIndex) => {
          return <tr className="text-center" key={spielIndex}>
            <td>{spielIndex + 1}</td>
            {this.props.spieler.map((spieler,spielerId) => {
              const spielstand=this.props.spielstandFuerSpielerAndSpiel(spielerId, spielIndex);
              let className = 'text-center '+ (spielstand.gewinner ? 'gewinner' : (spielstand.aussetzer ? '' : 'verlierer'));
              return (<td className={className}
                         key={spielerId}>{spielstand.spielwert}</td>);
            })}
          </tr>
        })}
        </tbody>
      </Table>
    );
  }
}
