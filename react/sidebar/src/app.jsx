import React from 'react';
import {Button} from 'react-bootstrap';
import styles from './app.scss'
import cx from 'classnames'

export default class App extends React.Component {
  render() {
      const cls = cx('nav');
    return (
        <div>
            <div className={styles.navHeader}>
                <div className="sidebar-collapse"></div>
            </div>
        </div>
    )
  }
}