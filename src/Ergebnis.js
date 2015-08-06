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
            {this.props.data.spielerIds.map((id) => {
              return <th key={id}>{this.props.data.spielerWithId(id)}</th>;
            })}
            </thead>
            <tbody>
            <tr>
              <td>Inhalt</td>
            </tr>
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
