import React, { Component } from "react";


var style = {
    borderStyle: "solid",
    marginTop: 20
};



/**
 * 
 * icon -> name of the weatherIcon
 * temp -> Current temperature
 * minTemp -> 
 * maxTemp ->
 * dt -> time of grabbing the new data in UTC
 * sunrise -> time of sunrise in UTC
 * sunset -> time of sunset in UTC
 */
class WeatherBlocks extends Component{

    
    render(){
        let image  = "http://openweathermap.org/img/w/<ICON>.png";
        image = image.replace(/<ICON>/i, this.props.icon);
        
        let smallStyle = {
            align: "left", 
            fontSize: 10
        }

        let cityNameStyle ={
            textAlign: "center",
            marginBottom: -20
        }

        let temperatureStyle = {
            marginTop: 10
        }

        return (
            <div>
                <p style={cityNameStyle}>{this.props.city}</p>
                <h2 style={style}> 
                    <img align={"left"} width={40} height={40} src={image} /> 
                    <p style={temperatureStyle}>{this.props.temp}˚</p> 
                    <p style={smallStyle}> High: {this.props.maxTemp}˚ Low: {this.props.maxTemp}˚</p>
                </h2>
            </div>)
    }


}




export default WeatherBlocks;