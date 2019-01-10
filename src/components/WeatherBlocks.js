/**
 * Each Weather Block is a 5 day forecast for a single city.
 */
import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";


var style = {
    borderStyle: "hidden hidden hidden hidden",
    marginTop: 20
};



/**
 *
 * city -> The name of the city
 * currentWeather ->
 *                  "icon" -> Icon name of current name
 *                  "weatherDescript" -> Description of current weather
 *                  "sunrise" -> Current time of sunrise in UTC
 *                  "sunset" -> Current time of sunset in UTC
 *                  "temp" -> Current temp in city
 *                  "minTemp" -> Current Min Temp in F
 *                  "maxTemp" -> Current Max Temp in F
 *                  "dt" ->  Current time of data taken.
 * forecastData -> Response from OpenWeatherMap
 */
class WeatherBlocks extends Component {


    /**
     * @return Array of the next 4 forecast days
     */
    getForecastDates(forecastData) {
        // let data = [];

        // let today = new Date();
        // let day = today.getDate();

        // //Index used to find the next date in the forecast
        // let i = 0;

        // for (i; i < forecastData.length; i++) {
        //     //Spllitting the DT to find the day
        //     let forecastDate = forecastData[i].dt_txt.split(/[^\d]+/gm);
        //     if (forecastDate[2] !== day)
        //         break;
        // }

        // //ForecastData has ~8 weather data per day.
        // for (i; i < forecastData.length;i += 5){
        //     data[i] = forecastData[i];
        // }

        // console.log(data);


    }


    render() {
        let image = "http://openweathermap.org/img/w/<ICON>.png";
        image = image.replace(/<ICON>/i, this.props.currentWeather["icon"]);

        let componentStyle = {
            borderStyle: "hidden hidden solid hidden"
        }

        let smallStyle = {
            align: "left",
            fontSize: 10
        }

        let cityNameStyle = {
            textAlign: "center",
            marginBottom: -20,
            borderStyle: "hidden hidden hidden hidden"
        }

        let temperatureStyle = {
            marginTop: 10
        }

        this.getForecastDates(this.props.forecastData)

        return (
            <Row className="show-grid" style={componentStyle}>
                <p style={cityNameStyle}>{this.props.city}</p>
                <Col id="currentWeather" lg={4} md={4} sm={4} xs={4}>
                    <Row className="show-grid">
                        <h2 style={style}>
                            <img align={"left"} width={40} height={40} src={image} alt="weatherImage" />
                            <p style={temperatureStyle}>{this.props.currentWeather.temp}˚</p>
                        </h2>
                    </Row>
                    <Row className="show-grid">
                        <h2 style={style}>
                            <p style={smallStyle}> High: {this.props.currentWeather.maxTemp}˚ Low: {this.props.currentWeather.maxTemp}˚</p>
                        </h2>
                    </Row>

                </Col>

                <Col id="forecast" lg={8} md={8} sm={8} xs={8} style={style}>
                    <Row className="show-grid">
                        <Col xs={6}>
                            1
                            </Col>

                        <Col xs={6}>
                            2
                            </Col>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={6}>
                            3
                            </Col>

                        <Col xs={6}>
                            4
                            </Col>
                    </Row>
                </Col>
            </Row>
        )
    }


}




export default WeatherBlocks;