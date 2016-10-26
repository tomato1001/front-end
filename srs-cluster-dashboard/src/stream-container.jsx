'use strict';
import React from 'react';
import 'whatwg-fetch';
import BsTable from './table/BsTable';
import BsTableHeaderColumn from './table/BsTableHeaderColumn';

class StreamContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            streams: [],
            count: 0,
            showLoading: true
        };
    }
    
    componentDidMount() {
        this.fetchData();
    }
    
    fetchData(curPage=1, size=10) {
        if (!this.state.showLoading) {
            this.setState(Object.assign({}, this.state, {showLoading: true}));
        }
        const start = (curPage - 1) * size;
        fetch(`/stream?offset=${start}&size=${size}`).then(resp => resp.json()).then(json => {
            this.setState({
                streams: json.r,
                count: json.c,
                showLoading: false
            });
        });
    }

    render() {
        return (
          <BsTable data={this.state.streams} 
                showLoading={this.state.showLoading} 
                nestedInPanel
                showToolbar
                rowCount={this.state.count}
                onHandleFetchData={(curPage, size) => this.fetchData(curPage, size)}
                title="直播流" 
                pagination 
                striped
                bordered 
                condensed 
                hover>
            <BsTableHeaderColumn field="name" dataAlign="center" width="10%">名称</BsTableHeaderColumn>
            <BsTableHeaderColumn field="fsIp" dataAlign="center">转发节点ip</BsTableHeaderColumn>
            <BsTableHeaderColumn field="node_ip" dataAlign="center">拉流节点ip</BsTableHeaderColumn>
            <BsTableHeaderColumn field="client_id" dataAlign="center">clientId</BsTableHeaderColumn>
            <BsTableHeaderColumn field="app_name" dataAlign="center">appName</BsTableHeaderColumn>
            <BsTableHeaderColumn field="created_date" dataAlign="center">创建日期</BsTableHeaderColumn>
          </BsTable>
        );
    }

}

export default StreamContainer;