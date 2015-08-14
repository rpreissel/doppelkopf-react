import React from 'react';
import {Link} from 'react-router';
import {ButtonToolbar,Button} from 'react-bootstrap';
import Spiel from './Spiel';


export default class SpielEingabe extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.createEmptyState();
  }


  createEmptyState() {
    return {gewinner: ([]), aussetzer: (-1), spielwert: (0)};
  }

  toggleSpielerGewinner(spielerId) {
    const gewinnerIndex = this.state.gewinner.indexOf(spielerId);
    if (gewinnerIndex < 0) {
      this.state.gewinner.push(spielerId);
      if (this.state.aussetzer === spielerId) {
        this.state.aussetzer = -1;
        this.setState({aussetzer: this.state.aussetzer});
      }
    } else {
      this.state.gewinner.splice(gewinnerIndex, 1);
    }
    this.setState({gewinner: this.state.gewinner});
  }

  toggleSpielerAussetzer(spielerId) {
    if (this.state.aussetzer < 0 || this.state.aussetzer !== spielerId) {
      this.state.aussetzer = spielerId;
    } else {
      this.state.aussetzer = -1;
    }
    this.setState({aussetzer: this.state.aussetzer});
  }

  spielerWertChanged(neuerWert) {
    let newValue=parseInt(neuerWert,10);
    if(newValue!==NaN && newValue>=0) {
      this.setState({spielwert: newValue});
    }
  }

  spielAbrechnen() {
    let spiel=new Spiel(this.state.gewinner,this.state.aussetzer,this.state.spielwert);
    this.props.onSpielAbrechnen(spiel);

    this.setState(this.createEmptyState());
  }

  spielAbrechenbar() {
    if(this.state.gewinner.length === 0) {
      return false;
    }

    if(this.props.mitAussetzer && this.state.aussetzer<0) {
      return false;
    }

    return true;
  }

  render() {
    let gewinnerButtons = <div className="form-group">
      <label>Gewinner</label>
      <ButtonToolbar>
        {this.props.spieler.map((spielerName, spielerId) => {
          const isGewinner = this.state.gewinner.indexOf(spielerId) >= 0;
          const toggleBar = isGewinner || this.state.gewinner.length <3;
          return (<Button key={spielerId} bsStyle={isGewinner ? 'primary' : 'default'} disabled={!toggleBar}
                          onClick={() => this.toggleSpielerGewinner(spielerId)}>{spielerName}</Button>);
        })}
      </ButtonToolbar>
    </div>;

    let aussetzerButtons = this.props.mitAussetzer ? <div className="form-group">
      <label>Aussetzer</label>
      <ButtonToolbar>
        {this.props.spieler
          .map((spielerName, spielerId) => {
            const isGewinner = this.state.gewinner.indexOf(spielerId) >= 0;
            const isAussetzer = this.state.aussetzer === spielerId;
            if (isGewinner) {
              return (<Button key={spielerId} bsStyle={'default'} disabled={true}>{spielerName}</Button>);
            }

            return (<Button key={spielerId} bsStyle={isAussetzer ? 'primary' : 'default'}
                            onClick={() => this.toggleSpielerAussetzer(spielerId)}>{spielerName}</Button>);
          })}
      </ButtonToolbar>
    </div> : null;

    return (
      <div>
        {gewinnerButtons}
        {aussetzerButtons}
        <div className="form-group">
          <label className="">Spielwert</label>

          <div className="row">
            <div className="col-md-2">
              <input className="text-right" type="text" value={this.state.spielwert}
                     onChange={(event) => this.spielerWertChanged(event.target.value)}/>
            </div>
            <div className="col-md-10">
              <ButtonToolbar>
                {[1,2,3,4,5,6,7,8].map((value)=> {
                  return (<Button key={value} bsStyle={'default'} onClick={() => this.spielerWertChanged(value)}>{value}</Button>);
                })}
              </ButtonToolbar>
            </div>
          </div>
        </div>
        <div>
          <ButtonToolbar>
            <Button bsStyle='primary' disabled={!this.spielAbrechenbar()} onClick={()=> this.spielAbrechnen()}>Spiel abrechnen</Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}
