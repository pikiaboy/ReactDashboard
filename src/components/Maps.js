import React, { Component } from "react";
import GoogleMapReact from "google-map-react"

class Map extends Component {
    static defaultProps = {
        center: { lat: 37.005782, lng: -121.568275 },
        zoom: 11
      }
    constructor(props) {
        super(props);
        this.state = {
            userLocation: null
        };
    }


    componentDidMount() {

        navigator.geolocation.getCurrentPosition(
            //onSuccess
            (pos) => {
                // var map = new google.maps.Map(
                //     document.getElementById("map"),
                //     {
                //         center: {lat: pos.coords.latitude, lng:pos.coords.longitude},
                //         zoom: 8
                //     }
                // );
                this.setState({
                    userLocation: pos
                })
            },
            //onError
            (error) => {
                window.alert("Could not auto find location, using address in .env");
                /*
                @TODO: Implement first time setup for user to add HOME address and then geocode and store
                lat and long in .env 
                */
                //call setstate with user provided address
                //add visual indicator to show cannot access current location
                console.log(error);
            });

    }

    render() {
        // let lat = (this.state.userLocation == null) ? "" : this.state.userLocation.coords.latitude;

        // let long = (this.state.userLocation == null) ? "" : this.state.userLocation.coords.longitude;
        return (
            <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: window.process.env.GOOGLE_API_KEY }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
            >
            </GoogleMapReact>
          </div>
        )
    };
}

export default Map;