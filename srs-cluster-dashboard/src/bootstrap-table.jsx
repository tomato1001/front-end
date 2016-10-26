'use strict';
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const tabOptions = {
	paginationShowsTotal: true,
	sizePerPageList: [
		{
			text: '10',
			value: 10
		}, {
			text: '20',
			value: 20
		}, {
			text: '50',
			value: 50
		}
	]
};

class UserTable extends React.Component {

	render() {
		return (
			<div>
				<BootstrapTable data={this.props.data} striped={true} hover={true} pagination={true} options={tabOptions}>
					<TableHeaderColumn dataField="id" isKey={true} width="70" dataAlign="center">ID</TableHeaderColumn>
					<TableHeaderColumn dataField="name" width="150" dataAlign="center">Name</TableHeaderColumn>
					<TableHeaderColumn dataField="price" dataAlign="center" dataSort={true}>Price</TableHeaderColumn>
				</BootstrapTable>
			</div>
		);
	}

}

UserTable.propTypes = {
	data: React.PropTypes.array
};

export default UserTable;