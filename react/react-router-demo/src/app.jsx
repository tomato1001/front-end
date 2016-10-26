import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import {Button, Nav, NavItem} from 'react-bootstrap'
import {Link} from 'react-router'
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap'

export default class App extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    handleSelect(selectedKey) {
        // console.log(selectedKey, this);
    }
    
	render() {
		return (
            <div>
                <h1>App</h1>
                <Nav bsStyle="pills" onSelect={this.handleSelect}>
                    <IndexLinkContainer to={{pathname: "/"}}>
                        <NavItem eventKey={0} title="Home">Home</NavItem>
                    </IndexLinkContainer>
                    <LinkContainer to={{pathname: '/repos'}}>
                        <NavItem eventKey={1} title="Item">repos</NavItem>
                    </LinkContainer>
                    <LinkContainer to={{pathname: '/about'}}>
                        <NavItem eventKey={2} title="about">about</NavItem>
                    </LinkContainer>
                </Nav>
                {this.props.children}
            </div>
		)
	}
}