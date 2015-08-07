import React from 'react';
import {Link} from 'react-router';
import {Panel} from 'react-bootstrap';


export default class Spielerauswahl extends React.Component {
  constructor(props) {
    super(props);

  }

  emitStateChanged() {
    this.props.onStateChanged();
  }

  anzahlSpielerChanged(fuenfspieler) {
    this.props.data.fuenfspieler=fuenfspieler;
    this.emitStateChanged();
  }

  spielerNameChanged(spielerId,name) {
    this.props.data.changeSpielerWithId(spielerId,name);
    this.emitStateChanged();
  }

  render() {
    const title = (
      <h3>Spielerauswahl</h3>
    );

    return (
      <div>
        <Panel header={title} bsStyle='info'>
          <div>
            <label className="checkbox-inline">
              <input type="checkbox" name="spieler" value="4" checked={!this.props.data.fuenfspieler} onChange={() => this.anzahlSpielerChanged(false)}/> 4 Spieler
            </label>
            <label className="checkbox-inline">
              <input type="checkbox" name="spieler" value="5" checked={this.props.data.fuenfspieler} onChange={() => this.anzahlSpielerChanged(true)}/> 5 Spieler
            </label>
          </div>
          <div className="form-inline">
          {
            this.props.data.spieler.map((name,id)=> {
              return <div className="form-group" key={id}>
                <label>{'Spieler '+ (id+1) + ': '}</label>
                <input className="form-control" type="text" value={name} onChange={(event) => this.spielerNameChanged(id,event.target.value)}/>
              </div>
            })
          }
          </div>

          <div>
            <Link to="ergebnis">Starte Spiel</Link>
          </div>

        </Panel>
      </div>
    );
  }
}
