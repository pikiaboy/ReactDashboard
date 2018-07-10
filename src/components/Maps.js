import React, { Component } from 'react';

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userLocation: null
        };
    }


    componentDidMount() {
        //Allowing us to use Google Maps API's
        var js_file = document.createElement('script');
        js_file.type = 'text/javascript';
        js_file.src = 'https://maps.googleapis.com/maps/api/js?&key=' + window.process.env.GOOGLE_API_KEY;
        document.getElementsByTagName('head')[0].appendChild(js_file);

        navigator.geolocation.getCurrentPosition(
            //onSuccess
            (pos) => {
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

        let lat = (this.state.userLocation == null) ? ""  : this.state.userLocation.coords.latitude;

        let long =(this.state.userLocation == null) ? ""  : this.state.userLocation.coords.longitude;
        return (
            <div> {lat}    {long}</div>
        )
    };
}




export default Map;