import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import {Button} from 'react-bootstrap';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Button bsStyle="success">Success</Button>
      </div>
    )
  }
}