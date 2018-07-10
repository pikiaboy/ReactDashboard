import React, { Component } from "react";

var style = {
    borderStyle: "solid",
    textAlign: "center",
    fontFamily: 'Courier New',
    height: "250px",
    lineHeight: "250px"
}

class Player extends Component {

    render() {
        return (
            <div>
                <h2 style={style}> Temp Player </h2>
            </div>
        )
    }
}




export default Player;

