/**
 * Contains weather Blocks for cities. 
 */
import React, { Component } from "react";
import WeatherBlocks from "./WeatherBlocks";

import axios from "axios";
const fs = window.require("fs");


axios.defaults.baseURL = "http://api.openweathermap.org/data/2.5";

var style = {
    fontFamily: "Courier New"
};

class Weather extends Component {

    //Takes in the city codes from props.
    //Makes a GET request to openweatherapi to grab the new data and save it to file.
    //*NOTE* Use this as a promise to make sure everything is written to file properly.
    updateForecast(){
        let url = "forecast?id=<CITYID>&units=imperial&appid=<APPID>";

        url = url.replace(/<APPID>/i, "APPID");
        
        let cityIDs = this.props.cityCodes;


        let forecastRequest = [];

        Object.keys(cityIDs).forEach(code => {
            let cityUrl = url.replace(/<CITYID>/i, cityIDs[code.toString()]);

            forecastRequest.push(axios.get(cityUrl));
        });

        Promise.all(forecastRequest)
        .then(function (response) {
           let forecastData = {};
           response.forEach(element => {
               forecastData[element.data.city.name] = element.data;
           });
           fs.writeFileSync("forecastData.json",JSON.stringify(forecastData, null, 4));
        });

    }

    updateCurrentWeather(){
        let url = "group?id=<CITYID>&units=imperial&appid=<APPID>";
        
        url = url.replace(/<APPID>/i, "APPID");
        
        let cityIDs = this.props.cityCodes;
        let codes = "";
        
        for (let city in cityIDs){
            codes = codes + cityIDs[city] + ",";
        }

        codes = codes.slice(0, -1);
        
        url = url.replace(/<CITYID>/i,codes);

        let currentWeather = {};

        axios.get(url)
        .then(function (response) {
            response.data.list.forEach(city => {
                currentWeather[city.name] = city;
            });
            fs.writeFileSync("currentWeatherData.json",JSON.stringify(currentWeather, null, 4));   
        })


    }

    componentDidMount(){
        this.updateForecast();
        this.updateCurrentWeather();

        this.forceUpdate();
    }

    /**
     * Function to get a unique identifier for city name.
     * @param: string
     * @return: string
     */
    hashCode(s) {
        var h = 0, l = s.length, i = 0;
        if ( l > 0 )
          while (i < l)
            h = (h << 5) - h + s.charCodeAt(i++) | 0;
        return h;
      };

    render() {
        let forecastData;
        let currentWeatherData;
        let thisComponent = this;
        try {
            forecastData = JSON.parse(fs.readFileSync("forecastData.json"));
            currentWeatherData = JSON.parse(fs.readFileSync("currentWeatherData.json"))
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.log('File not found!');

                /**
                 * Can instead encapsulate entire block in while(file_does_not_exist), but it makes the
                 * loading animation super choppy
                 */
                setTimeout(function(){thisComponent.componentDidMount();}, 3000); 
                
                return (<h2 style={style}> Loading... </h2>) //@TODO: Use a loading animation instead. 
              } else {
                throw err;
              }
        }
        
        let weatherBlocks = [];

        //@TODO: To optimize for PTL1, can make an ajax loader that would hit multiple CDN's.
        for (let cityName in forecastData){
            let props = {};

            let currentWeather = {};

            currentWeather["icon"] = currentWeatherData[cityName].weather["0"].icon;
            currentWeather["weatherDescript"] = currentWeatherData[cityName].weather["0"].description
            currentWeather["sunrise"] = currentWeatherData[cityName].sys.sunrise;
            currentWeather["sunset"] = currentWeatherData[cityName].sys.sunset;
            currentWeather["temp"] = currentWeatherData[cityName].main.temp;
            currentWeather["minTemp"] = currentWeatherData[cityName].main.temp_min;
            currentWeather["maxTemp"] = currentWeatherData[cityName].main.temp_max;
            currentWeather["dt"] = currentWeatherData[cityName].dt;

            props["city"] = cityName;
            props["currentWeather"] = currentWeather;
            props["forecastData"] = forecastData[cityName].list;
            

            weatherBlocks.push(<WeatherBlocks key={this.hashCode(cityName)} {...props}/>);
        }
        
        return (<div style={style}>
            {weatherBlocks}
        </div>)
    }
}


export default Weather;