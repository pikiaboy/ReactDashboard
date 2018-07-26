/**React Stuff**/
import React from "react";
import ReactDOM from "react-dom";
import { Grid, Row, Col , Clearfix} from "react-bootstrap";

/*Components*/
import Clock from "./components/Clock";
import Config from "./components/configuration/Config";
import Weather from "./components/Weather";

/**Other stuff **/
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./index.css";
import "./config";
var configOptions = require("./options.json");

// function loadNavBar() {
//   ReactDOM.render(
//     <NavBar />,
//     document.getElementById("navbar")
//   );
// }

//@TODO: If time is after 7pm? use dark theme
function loadHomePage() {
  let dateOffset = {
    top: 20
  }

  let offset = {
    position: "absolute",
    left: 25
  }

  ReactDOM.render(
    <Grid>
   
      <Row className="show-grid">

        <Col xs={6}>
          <Clock size="100px" option="time" />
        </Col>
      
        <Col xs={6} style={dateOffset}>
          <Clock size="100px" option="date" />
        </Col>
      
      </Row>

      <Row className="show-grid"> 
        <Clearfix style={offset}>
          <Weather cityCodes={configOptions.cityCodes}/>
         </Clearfix>
      </Row>
   
    </Grid>,
    document.getElementById("root")
  );
}

function loadConfigureOptions() {
  // console.log(Object.keys(configOptions))
  ReactDOM.render(
    <Config options={Object.keys(configOptions)} />,
    document.getElementById("root")
  );
}



// loadNavBar();

if (configOptions.firstRun) {
  loadConfigureOptions();
} else {
  loadHomePage();
}
