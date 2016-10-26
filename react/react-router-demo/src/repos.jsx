'use strict';
import React from 'react';
import {ListGroup, ListGroupItem, Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

class Repos extends React.Component {
    
    handleSubmit(event) {
        event.preventDefault();
        const userName = event.target.elements[0].value
        const repo = event.target.elements[1].value
        const path = `/repos/${userName}/${repo}`
        this.context.router.push(path);
    }

    render() {
        return (
            <div>
                <h2>Repos</h2>
                <ListGroup>
                    <LinkContainer to={{pathname: '/repos/item/1'}}>
                        <ListGroupItem>Item 1</ListGroupItem>
                    </LinkContainer>
                    <LinkContainer to={{pathname: '/repos/item/2'}}>
                        <ListGroupItem>Item 2</ListGroupItem>
                    </LinkContainer>
                    <ListGroupItem>
                        <Form inline onSubmit={(e) => this.handleSubmit(e)}>
                          <FormGroup controlId="formInlineName">
                            <ControlLabel>userName</ControlLabel>
                            {' '}
                            <FormControl type="text" placeholder="Jane Doe" />
                          </FormGroup>
                          {' '}
                          <FormGroup controlId="formInlineEmail">
                            <ControlLabel>repo</ControlLabel>
                            {' '}
                            <FormControl type="text" placeholder="1" />
                          </FormGroup>
                          {' '}
                          <Button type="submit">Go</Button>
                        </Form>
                    </ListGroupItem>
                </ListGroup>
                {this.props.children}
            </div>
        );
    }
}

Repos.contextTypes = {
    router: React.PropTypes.object
}

export default Repos;