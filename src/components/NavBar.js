import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class NavBar extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">React-DashBoard</a>
                    </Navbar.Brand>
                </Navbar.Header>

                <Nav>
                    <NavItem eventKey={1} href="#">
                        Link
                    </NavItem>

                    <NavItem eventKey={2} href="#">
                        Link
                    </NavItem>

                    <NavDropdown eventKey={3} title="Where we going?" id="basic-nav-dropdown">

                        <MenuItem eventKey={3.1}>Home</MenuItem>

                        <MenuItem eventKey={3.2}>School</MenuItem>
                        
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
}


export default NavBar;