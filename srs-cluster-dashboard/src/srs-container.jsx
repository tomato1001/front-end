'use strict';
import React from 'react';
import 'whatwg-fetch';
import BsTable from './table/BsTable';
import BsTableHeaderColumn from './table/BsTableHeaderColumn';

class SrsNodeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.isFirstLoad = true;
        this.state = {
            nodes: []
        };
    }
    
    componentDidMount() {
        this.fetchData();
        this._intvId = setInterval(() => this.fetchData(), 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this._intvId);
    }
    
    fetchData() {
        const promise = fetch('/srs').then(resp => resp.json()).then(json => {
            this.isFirstLoad = false;
            this.setState({
                nodes: json
            });
        });
    }

    render() {
        return (
          <BsTable data={this.state.nodes} nestedInPanel showLoading={this.isFirstLoad} title="srs服务器" striped bordered condensed hover>
            <BsTableHeaderColumn field="name" dataAlign="center" width="10%">ip</BsTableHeaderColumn>
            <BsTableHeaderColumn field="cname" dataAlign="center">类型</BsTableHeaderColumn>
            <BsTableHeaderColumn field="vhost" dataAlign="center">vhost</BsTableHeaderColumn>
            <BsTableHeaderColumn field="maxCount" dataAlign="center">最大流数量</BsTableHeaderColumn>
            <BsTableHeaderColumn field="count" dataAlign="center">当前流数量</BsTableHeaderColumn>
          </BsTable>
        );
    }

}

export default SrsNodeContainer;