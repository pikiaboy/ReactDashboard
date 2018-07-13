/* global google */
import React from "react";
import { Button } from "react-bootstrap"
import options from "../options.json"

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

const googleMapsURL = "https://maps.googleapis.com/maps/api/js?key=" + window.process.env.GOOGLE_API_KEY + "&v=3.exp&libraries=geometry,drawing,places"

let MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: googleMapsURL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({

    drawRoute(destination){
      let DirectionsService = new google.maps.DirectionsService();

      let userLat, userLong;
      
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
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
        }
      )
    },

    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      this.drawRoute("UCSC");
    },

    componentDidUpdate(prevProps, prevState){
      if (prevProps.destination !== this.props.destination){
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
        {allButtons}

        <MapWithADirectionsRenderer destination={this.state.destination} />

      </div>
    )
  }
}


export default Map;