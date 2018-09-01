import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import apiService from '../libraries/apiService';
import {validateData} from '../libraries/general';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinations: [],
      id: Math.floor(Math.random() * 2000).toString(10),
      origin_id: '',
      destination_id: '',
      company_name: '',
      openBar: false,
      barMessage: '',
      error: false
    };
  }
  handleClose = (event, reason) => {
    this.setState({ openBar: false });
  }
  handleDestination (value) {
    value !== '' ? this.getDestinations(value) : this.setState({ destinations: [], destination_id: ''})
  }
  handleSelection = name => event => {
    this.setState({ [name]: event.target.value });
    name === 'origin_id' && this.handleDestination(event.target.value)
  }
  getDestinations(id){
    apiService('GET',`https://0sysjslkra.execute-api.us-east-1.amazonaws.com/test/stations/origins/${id}`)
      .then((response) => this.setState({ destinations: response.data.data.stations }))
  }
  saveForm = () => {
    validateData(this.state) ?
      apiService('POST',`https://0sysjslkra.execute-api.us-east-1.amazonaws.com/test/routes`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          id: this.state.id,
          origin_id: this.state.origin_id,
          destination_id: this.state.destination_id,
          departure_time: this.state.departure_time,
          arrival_time: this.state.departure_time,
          company_name: this.state.company_name
        }
      }
    ).then((response) => this.setState({ openBar: true, barMessage: 'Tu ruta se ha guardado', error: false }))
    : this.setState({ openBar: true, barMessage: 'Faltan campos por llenar!', error: true })
  }
  render() {
    return (
      <div className="create screen">
        <FormControl className="inputs">
          <InputLabel>Origen</InputLabel>
          <NativeSelect
            value={this.state.origin}
            onChange={this.handleSelection('origin_id')}
          >
            <option value="" />
            { this.props.origins.map( element => 
              <option key={element.id} value={element.id}>{element.name}, {element.state}</option>
            )}
          </NativeSelect>
          <FormHelperText>Selecciona el origen</FormHelperText>
        </FormControl>
        <FormControl className="inputs">
          <InputLabel>Destino</InputLabel>
          <NativeSelect
            value={this.state.destination}
            onChange={this.handleSelection('destination_id')}
          >
            <option key="" value="" />
            { this.state.destinations.map( element => 
              <option key={element.id} value={element.id}>{element.name}, {element.state}</option>
            )}
          </NativeSelect>
          <FormHelperText>{ this.state.origin_id ? 'Selecciona el destino' : 'Selecciona primero el origen para conocer los destinos' } </FormHelperText>
        </FormControl>
        <TextField
          className="inputs"
          id="departure"
          label="Fecha de salida"
          value={this.state.departure}
          onChange={this.handleSelection('departure_time')}
          margin="normal"
          type="date"
          helperText="Ingresa la fecha de salida"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl className="inputs">
          <InputLabel>Compañía</InputLabel>
          <NativeSelect
            value={this.state.company}
            onChange={this.handleSelection('company_name')}
          >
            <option key="" value="" />
            <option key={'Futura'} value={'Futura'}>Futura</option>
            <option key={'Chihuahuenses'} value={'Chihuahuenses'}>Chihuahuenses</option>
            <option key={'Pacífico'} value={'Pacífico'}>Pacífico</option>
          </NativeSelect>
          <FormHelperText>Selecciona la compañía de transportes</FormHelperText>
        </FormControl>
        <div className="saveButton">
          <Button variant="fab" color="primary" aria-label="Add" onClick={this.saveForm}>
            <AddIcon />
          </Button>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.state.openBar}
          className="snackBar"
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
         <SnackbarContent
          className={this.state.error ? 'error' : 'success'}
          message={
            <span>
              {this.state.barMessage}
            </span>
          }
        />
        </Snackbar>
      </div>
    );
  }
}

export default Create;
