/**React Stuff**/
import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col} from 'react-bootstrap';

/*Components*/
import NavBar from './components/NavBar';
import Clock from './components/Clock';
import Player from './components/SpotifyPlayer';
import Map from './components/Maps';

/**Other stuff **/
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.css';
import './config';


ReactDOM.render(
  <NavBar />,
  document.getElementById('navbar')
);


ReactDOM.render(
<Grid>
  <Row className="show-grid">
   
    <Col xs={4}>
      <Player />
    </Col>

    <Col xs={4}> 
        <Clock size="250px"/>
    </Col>

    <Col xs={4}>
  

      <Map />
    </Col>


    
  </Row>
</Grid>,
  document.getElementById('root')
);