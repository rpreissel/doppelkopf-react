import React from 'react';
import {Link} from 'react-router';
import {ButtonToolbar,Button} from 'react-bootstrap';


export default class SpielEingabe extends React.Component {
  constructor(props) {
    super(props);
    this.state={ gewinner: ([]), aussetzer: (-1), spielwert: (0)};
  }

  toggleSpielerGewinner(spielerId) {
    const gewinnerIndex=this.state.gewinner.indexOf(spielerId);
    if(gewinnerIndex<0) {
      this.state.gewinner.push(spielerId);
    } else {
      this.state.gewinner.splice(gewinnerIndex,1);
    }
    this.setState({gewinner: this.state.gewinner});
  }

  render() {
    return (
      <div>
        Gewinner
        <ButtonToolbar>
          {this.props.spieler.map((spielerName,spielerId) => {
            const isGewinner=this.state.gewinner.indexOf(spielerId)>=0;
            return (<Button key={spielerId} bsStyle={isGewinner ? 'primary' : 'default'} onClick={() => this.toggleSpielerGewinner(spielerId)}>{spielerName}</Button>);
          })}
        </ButtonToolbar>
      </div>
    );
  }
}
