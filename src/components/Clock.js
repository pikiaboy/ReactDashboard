import React, { Component } from 'react';



var style = {
  borderStyle: "solid",
  textAlign: "center",
  fontFamily: 'Courier New'
};

function CurrDate(props) {
  return <h2 style={props.style}> {props.date.toLocaleTimeString()}</h2>;
}

class Clock extends Component {
  constructor(props) {
    style["height"] = props.size;
    style["lineHeight"] = props.size;
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }


  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <CurrDate date={this.state.date} style={style} />
      </div>
    )
  }
}




export default Clock;