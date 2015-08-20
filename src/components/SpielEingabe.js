import React from 'react';
import {Link} from 'react-router';
import {ButtonToolbar,Button} from 'react-bootstrap';
import * as SpieleingabeStore from '../reducers/spieleingabe';


export default class SpielEingabe extends React.Component {
  constructor(props) {
    super(props);
  }


  spielerWertChanged(neuerWert) {
    const newValue=parseInt(neuerWert,10);
    if(newValue!==NaN) {
      this.props.actions.spielwertAendern(neuerWert);
    }
  }

  spielAbrechnen() {
    const spieleingabe=this.props.spieleingabe;
    this.props.actions.spielAbrechnen(SpieleingabeStore.getGewinner(spieleingabe), SpieleingabeStore.getAussetzer(spieleingabe), spieleingabe.get('spielwert'));
  }

  render() {
    let gewinnerButtons = <div className="form-group">
      <label>Gewinner</label>
      <ButtonToolbar>
        {this.props.spieler.map((spielerName, spielerId) => {
          const isGewinner = this.props.spieleingabe.get('gewinner').get(spielerId);
          const toggleBar = this.props.spieleingabe.get('toggleGewinner').get(spielerId);
          return (<Button key={spielerId} bsStyle={isGewinner ? 'primary' : 'default'} disabled={!toggleBar}
                          onClick={() => this.props.actions.toggleGewinner(spielerId)}>{spielerName}</Button>);
        })}
      </ButtonToolbar>
    </div>;

    let aussetzerButtons = this.props.spieleingabe.get('fuenfSpieler') ? <div className="form-group">
      <label>Aussetzer</label>
      <ButtonToolbar>
        {this.props.spieler
          .map((spielerName, spielerId) => {
            const isAussetzer = this.props.spieleingabe.get('aussetzer').get(spielerId);
            const toggleBar = this.props.spieleingabe.get('toggleAussetzer').get(spielerId);
            return (<Button key={spielerId} bsStyle={isAussetzer ? 'primary' : 'default'}  disabled={!toggleBar}
                            onClick={() => this.props.actions.toggleAussetzer(spielerId)}>{spielerName}</Button>);
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
            <div className="col-sm-2">
              <input className="text-right" type="text" value={this.props.spieleingabe.get('spielwert')}
                     onChange={(event) => this.spielerWertChanged(event.target.value)}/>
            </div>
          </div>
            <div className="row">
              <ButtonToolbar className="col-sm-8">
                {[1,2,3,4,5,6,7,8].map((value)=> {
                  return (<Button key={value} bsStyle={'default'} onClick={() => this.spielerWertChanged(value)}>{value}</Button>);
                })}
              </ButtonToolbar>
            </div>
        </div>
        <div>
          <ButtonToolbar>
            <Button bsStyle='primary' disabled={!this.props.spieleingabe.get('abrechenbar')} onClick={()=> this.spielAbrechnen()}>Spiel abrechnen</Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}
