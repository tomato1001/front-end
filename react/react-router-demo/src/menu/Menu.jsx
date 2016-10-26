'use strict';
import React from 'react';
import {Nav, NavItem} from 'react-bootstrap'

class Menu extends React.Component {

    render() {
        return (
            <Nav bsStyle="pills" stacked>
                <NavItem eventKey={0} title="Home">任务管理</NavItem>
                <NavItem eventKey={1} title="Item">日志管理</NavItem>
                <NavItem eventKey={2} title="about">统计管理</NavItem>
            </Nav>
        );
    }

}

export default Menu;