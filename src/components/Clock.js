import React, { Component } from "react";

var style = {
  borderStyle: "solid",
  textAlign: "center",
  fontFamily: "Courier New"
};

function CurrTime(props) {
  return <h2 style={props.style}> {props.date.toLocaleTimeString()}</h2>;
}

function CurrDate(props) {
  let numMonth = props.date.getMonth();
  let numDay = props.date.getDate();
  let numYear = props.date.getFullYear();
  let date = props.date.toDateString();

  let numDate = numMonth + "/" + numDay + "/" + numYear;

  let dateStyle = {
    borderStyle: "solid",
    textAlign: "center",
    fontFamily: "Courier New",
    height: "100px",
    lineHeight: "100px"
  }

  return (
    <div style={dateStyle}>
      <h5> {numDate} </h5>
      <h3> {date} </h3>
    </div>
  )
}

class Clock extends Component {
  constructor(props) {
    if (props.option === "time") {
      style.height = props.size;;
      style.lineHeight = props.size;;
    }

    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    if (this.props.option === "time") {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  }


  componentWillUnmount() {
    if (this.props.option === "time") {
      clearInterval(this.timerID);
    }
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {


    if (this.props.option === "time") {
      return (
        <div>
          <CurrTime date={this.state.date} style={style} />
        </div>
      )
    }
    if (this.props.option === "date") {
      return (
        <CurrDate date={this.state.date} style={style} />
      )
    }

  }
}




export default Clock;