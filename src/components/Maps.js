/* global google */
import React from "react";
import { Button } from "react-bootstrap";
import options from "../options.json";

const fs = window.require("fs")

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

const googleMapsURL = "https://maps.googleapis.com/maps/api/js?key=" + "AIzaSyCFbh0ORX2EX4STGELbDJck5ffK6DjrkrE" + "&v=3.exp&libraries=geometry,drawing,places"

let MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: googleMapsURL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px`, width: "300px" }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({

    //saves directions to disk in order for other components to use
    saveDirections(directions) {
      let dest = directions.request.destination.query
      try {
        let oldJSON = JSON.parse(fs.readFileSync("directions.json"));

        oldJSON[dest] = directions;

        let json = JSON.stringify(oldJSON);
        fs.writeFileSync("directions.json", json, "utf8", console.log("Directions saved for " + directions.request.destination.query));

      } catch (e) {
        console.log("could not read old json file");
        let jsonFile = {};
        jsonFile[dest] = directions;
        fs.writeFileSync("directions.json", JSON.stringify(jsonFile), "utf8", console.log("Directions saved for " + directions.request.destination.query));
      }


    },

    drawRoute(destination) {
      let DirectionsService = new google.maps.DirectionsService();

      let userLat, userLong;

      if (options.currentAddress != null) {
        DirectionsService.route({
          origin: options.currentAddress,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
            this.saveDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
            console.log(result)
          }
        });
      } else {
        navigator.geolocation.getCurrentPosition(
          //onSuccess
          (pos) => {
            userLat = pos.coords.latitude;
            userLong = pos.coords.longitude;

            DirectionsService.route({
              origin: new google.maps.LatLng(userLat, userLong),
              destination: destination,
              travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                  directions: result,
                });
                this.saveDirections(result);
              } else {
                console.error(`error fetching directions ${result}`);
              }
            });
          }
        )

      }

    },

    componentDidMount() {
      this.drawRoute("UCSC");
    },

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.destination !== this.props.destination) {
        this.drawRoute(this.props.destination)
      }
    }

  })
)(props =>
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);


class Map extends React.Component {

  constructor(props) {
    super(props);

    this.updateMap = this.updateMap.bind(this)

    this.state = {
      origin: null,
      destination: null
    }
  }

  updateMap(address) {
    console.log(address);
    this.setState({
      destination: address
    });
  }

  createAddressButton(address) {
    return (
      <Button bsStyle="primary" onClick={() => this.updateMap(address)} key={address} > {address} </Button>
    )
  }

  render() {

    let allButtons = options.addressShortcuts.map(address => this.createAddressButton(address));

    return (

      <div>

        <MapWithADirectionsRenderer destination={this.state.destination} />

        {allButtons}
      </div>
    )
  }
}


export default Map;