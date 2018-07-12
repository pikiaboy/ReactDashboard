import React, { Component } from 'react';
import {Grid, Col, ListGroup, ListGroupItem} from "react-bootstrap";
var configOptions = require("../../options.json");


class Config extends Component {

    loadOptionName(option){
        return(
            <ListGroupItem key={option}> {option} </ListGroupItem>
        );
    }

    loadOptionNames(options){
        configOptions["firstRun"] = false;
        options.splice(0,1);
        return options.map(option => this.loadOptionName(option))
    }

    render() {
        return (
            <Grid>

                <Col xs={3}>
                    <ListGroup> 
                        {this.loadOptionNames(this.props.options)}
                    </ListGroup>
                </Col>

                <Col xs={9}>
                    sdkljfhsdf
                </Col>

            </Grid>)
    };
}

export default Config;