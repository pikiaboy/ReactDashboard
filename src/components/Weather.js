import React, { Component } from "react";
import axios from "axios";


axios.defaults.baseURL = "http://api.openweathermap.org/data/2.5";

var style = {
    borderStyle: "solid",
    textAlign: "center",
    fontFamily: "Courier New",
    height: 700,
    width: 345
};

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherIcon: null,
            tempearture: null,
            minTemp: null,
            maxTemp: null,
            dt: null,
            sunrise: null,
            sunset: null
        }
    }

    componentDidMount(){
        let url = "group?id=<ID>&units=imperial&appid=WEATHERID";
        
        let cityCodes = this.props.cityCodes;
        let codes = "";
        for (let city in cityCodes){
            codes = codes + cityCodes[city] + ",";
        }

        codes = codes.slice(0, -1);

        url = url.replace(/WEATHERID/i, "WEATHERID");
        url = url.replace(/<ID>/i,codes);

        // let axiosInstance = axios.create({
        //     baseURL: "api.openweathermap.org/data/2.5/group?"
        // })

        axios.get(url)
        .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        return (<h2 style={style}> HELLO </h2>)
    }
}


export default Weather;