import React, { Component } from 'react'
import { Grid, Jumbotron } from 'react-bootstrap'

import MapContainer from './MapContainer'

class App extends Component {

  render() {
    return (
      <div>
        <Jumbotron>
          <Grid>
            <h1>Weather App</h1>
            <h5>Click anywhere in the world and find out the weather!</h5>
            <br />
            <MapContainer />
          </Grid>
        </Jumbotron>
      </div>
    )
  }
}

export default App
