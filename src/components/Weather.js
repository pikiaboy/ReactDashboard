/**
 * Contains weather Blocks for cities.
 */
import React, { Component } from "react";
import WeatherBlocks from "./WeatherBlocks";

import axios from "axios";


axios.defaults.baseURL = "http://li893-35.members.linode.com:8081";

var style = {
    fontFamily: "Courier New"
};


class Weather extends Component {

    /**
     *  Takes in the city codes from props.
     *  Makes a GET request to backend to grab the new data
     * @param cityCodes
     * @returns JSON of forecast data
     */
    updateForecast() {

        let cityIDs = "";

        Object.keys(this.props.cityCodes).forEach(cityId => {
            cityIDs += this.props.cityCodes[cityId] + ",";
        })

        cityIDs = cityIDs.slice(0, -1);

        axios.get("/weather/currentWeather?cityId=" + cityIDs)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return {};
            })

    }

    /**
     * Heleper method for updateCurrentWeather()
     * @param {*} currentWeatherData
     *
     * @returns {*} Array of WeatherBlocks
     */
    populateCurrentWeather(currentWeatherData){
        let weatherBlocks = [];

        for (let i = 0; i < currentWeatherData.count; i++) {
            let props = {};

            props["city"] = currentWeatherData.list[i].city;
            props["currentWeather"] = currentWeatherData.list[i].currentWeather;

            weatherBlocks.push(<WeatherBlocks key={i} {...props} />);
        }

        return weatherBlocks;
    }

    /**
     *  Takes in the city codes from props.
     *  Makes a GET request to backend to grab the new data
     * @param cityCodes
     * @returns Promise that returns a JSON of the data.
     */
    updateCurrentWeather() {

        let cityIDs = "";

        Object.keys(this.props.cityCodes).forEach(cityId => {
            cityIDs += this.props.cityCodes[cityId] + ",";
        })

        cityIDs = cityIDs.slice(0, -1);

        return axios.get("/weather/currentWeather?cityId=" + cityIDs)
            .then(response =>{
                console.log(response.data)
                return this.populateCurrentWeather(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    /**
     * Function to get a unique identifier for city name.
     * @param: string
     * @return: string
     */
    hashCode(s) {
        var h = 0,
            l = s.length,
            i = 0;
        if (l > 0)
            while (i < l)
                h = (h << 5) - h + s.charCodeAt(i++) | 0;
        return h;
    };



    /**
     * React Lifecycle Methods
     */

    constructor(props){
        super(props);
        this.state = {
            weatherBlocks: []
        };
    }

    componentDidMount(){
        let currentComponent = this;

        this.updateCurrentWeather()
            .then(function (data) {
                currentComponent.setState({
                    weatherBlocks: data
                })
            })
            .catch(error => {
                console.log(error);
            });

    }


    render() {
        console.log(this.state.weatherBlocks);
        return (
            !this.state.weatherBlocks ?
                <div style={style}>
                    loading...
                </div>
                :
                <div style={style}>
                    {this.state.weatherBlocks}
                </div>

        )
    }
}


export default Weather;