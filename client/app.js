import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
  Route,
  withRouter
} from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import apiService from './libraries/apiService';
import Home from './screens/Home';
import Create from './screens/Create';
import './style'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {origins: [], routes: []};
  }
  componentDidMount() {
    apiService('GET','/api/origins')
      .then((response) => this.setState({ origins: response.data.data.stations }))
      this.getRoutes()
  }
  getRoutes = () => {
    apiService('GET','https://0sysjslkra.execute-api.us-east-1.amazonaws.com/test/routes')
      .then((response) => this.setState({ routes: response.data.data.routes }))
  }
  componentWillReceiveProps(nextProps) {
    nextProps.location.pathname === '/' && this.getRoutes()
  }
  handleNavigation = (event, value) => {
    this.props.history.push(value)
  };
  render() {
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              App de rutas
            </Typography>
          </Toolbar>
        </AppBar>
        <Route exact path="/" component={() => <Home getRoutes={this.getRoutes} routes={this.state.routes} origins={this.state.origins}/>}/>
        <Route exact path="/crear" component={() => <Create origins={this.state.origins}/>}/>
        <BottomNavigation
        value={this.props.location.pathname}
        onChange={this.handleNavigation}
        showLabels
        >
          <BottomNavigationAction label="Rutas" icon={<LocationOnIcon/>} value="/" />
          <BottomNavigationAction label="Crear" icon={<RestoreIcon />} value="/crear"/>
        </BottomNavigation>
      </div>
    );
  }
}

export default withRouter(App);
