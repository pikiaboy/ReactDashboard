import React, { Component } from "react";
import WeatherBlocks from "./WeatherBlocks";

import axios from "axios";
const fs = window.require("fs");


axios.defaults.baseURL = "http://api.openweathermap.org/data/2.5";

var style = {
    borderStyle: "solid",
    fontFamily: "Courier New",
    height: 700,
    width: 345
};

class Weather extends Component {


    componentDidMount(){
        let url = "group?id=<ID>&units=imperial&appid=<WEATHERID>";
        
        let cityCodes = this.props.cityCodes;
        let codes = "";
        for (let city in cityCodes){
            codes = codes + cityCodes[city] + ",";
        }

        codes = codes.slice(0, -1);

        url = url.replace(/<WEATHERID>/i, "WEATHERCODE");
        url = url.replace(/<ID>/i,codes);

        //Having issues with "this" being called in the promise below. Most likely has to do with context of promieses.
        let theComponet = this;

        axios.get(url)
        .then(function (response) {
            console.log(response);
            fs.writeFileSync("weatherData.json", JSON.stringify(response));
            theComponet.forceUpdate();    
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    render() {
        let weatherData;
        try {
            weatherData = JSON.parse(fs.readFileSync("weatherData.json"));
            
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.log('File not found!');
                return (<h2 style={style}> Loading... </h2>) //@TODO: Use a loading animation instead. 
              } else {
                throw err;
              }
        }

        //load weatherBlocks.
        let weatherBlocks = [];

        //@TODO: To optimize for PTL1, can make an ajax loader that would hit multiple CDN's.
        for (let i = 0; i < weatherData.data.cnt; i++){
            let props = {};
            
            props["city"] = weatherData.data.list[i].name;
            props["icon"] = weatherData.data.list[i].weather["0"].icon;
            props["temp"] = weatherData.data.list[i].main.temp;
            props["minTemp"] = weatherData.data.list[i].main.temp_min;
            props["maxTemp"] = weatherData.data.list[i].main.temp_max;
            props["dt"] = weatherData.data.list[i].dt;
            props["sunrise"] = weatherData.data.list[i].sys.sunrise;
            props["sunset"] = weatherData.data.list[i].sys.sunset;

            weatherBlocks.push(<WeatherBlocks key={i} {...props}/>);
        }

        return (<div style={style}>
            {weatherBlocks}
        </div>)
    }
}


export default Weather;