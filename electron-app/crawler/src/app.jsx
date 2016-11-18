import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import cx from 'classnames';
import {Button, Panel, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

export default class App extends React.Component {
    
    renderAccount() {
        return (
            <div className={styles.pdb10}>
                <FormGroup controlId="formInlineName">
                  <ControlLabel>帐号</ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder="登录帐号" className={styles.w150}/>
                </FormGroup>
                {' '}
                <FormGroup controlId="formInlineEmail">
                  <ControlLabel>密码</ControlLabel>
                  {' '}
                  <FormControl type="password" placeholder="请输入密码" className={styles.w150}/>
                </FormGroup>
            </div>
        );
    }
    
    renderRange() {
        return (
            <div className={styles.pdb10}>
                <FormGroup controlId="formInlineName">
                  <ControlLabel>范围</ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder="Jane Doe" className={styles.w150}/>
                </FormGroup>
                {'  -  '}
                <FormGroup controlId="formInlineEmail">
                  {' '}
                  <FormControl type="text" placeholder="jane.doe@example.com" className={styles.w150}/>
                </FormGroup>
            </div>
        );
    }
    
    renderPath() {
        const {chromeDriverPath} = styles;
        return (
            <div className={styles.pdb10}>
                <FormGroup controlId="chromeDriverPath" className={chromeDriverPath}>
                  <FormControl type="text" placeholder="请指定chromedriver路径"/>
                </FormGroup>
                {' '}
                <p/>
                <FormGroup controlId="chromeDriverPath" className={chromeDriverPath}>
                  <FormControl type="text" placeholder="请指定图片存储路径"/>
                </FormGroup>
            </div>
        );
    }
    
    renderButton() {
        const spanCls = cx(styles.inlineBlock, styles.w20);
        return (
            <div className={'text-center'}>
                <Button bsStyle="primary" className={styles.w80}>开始</Button>
                <span className={spanCls}></span>
                <Button bsStyle="danger" className={styles.w80}>停止</Button>
            </div>
        );
    }
    
  render() {
    return (
        <Panel header="Title" className={styles.panelContainer} bsStyle="primary">
            <div className={styles.pd20}>
                <Form inline>
                    {this.renderAccount()}
                    {this.renderRange()}
                    {this.renderPath()}
                    {this.renderButton()}
                </Form>
            </div>
        </Panel>
    )
  }
}