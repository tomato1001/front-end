import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import {Button} from 'react-bootstrap';

export default class App extends React.Component {
  render() {
    
    const children = React.Children.map(this.props.children, (c, idx) => {
      return React.cloneElement(c, {bsStyle: "default"});
    });
    
    return (
      <div>
        <Button bsStyle="success" {...this.props}>Success</Button>
        {children}
      </div>
    )
  }
}