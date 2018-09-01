import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getTerminalName } from '../libraries/general';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import apiService from '../libraries/apiService';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  deleteRoute(id){
    apiService('DELETE',`https://0sysjslkra.execute-api.us-east-1.amazonaws.com/test/routes/${id}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then( () => {
      this.props.getRoutes()
    })
  }
  render() {
    return (
      <div className="routes screen">
          {this.props.routes.length > 0 ? <Table>
            <TableHead>
              <TableRow>
                <TableCell>Origen</TableCell>
                <TableCell>Destino</TableCell>
                <TableCell>Linea</TableCell>
                <TableCell>Salida</TableCell>
                <TableCell>Llegada</TableCell>
                <TableCell>Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { this.props.routes.map( (element, index) =>
                  <TableRow key={index}>
                    <TableCell>
                      {this.props.origins.length > 0 &&
                        getTerminalName(element.origin_id, this.props.origins)
                      }
                    </TableCell>
                    <TableCell>
                      {this.props.origins.length > 0 &&
                        getTerminalName(element.destination_id, this.props.origins)
                      }
                    </TableCell>
                    <TableCell>{element.company_name}</TableCell>
                    <TableCell>{element.departure_time}</TableCell>
                    <TableCell>{element.arrival_time}</TableCell>
                    <TableCell>
                      <IconButton aria-label="Delete" onClick={() => this.deleteRoute(element.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
              )}
            </TableBody>
            </Table>
            : <div>No hay rutas</div> 
          }
      </div>
    );
  }
}

export default Home;
