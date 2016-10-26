import React from 'react';
import BsTableBodyColumn from './BsTableBodyColumn';

class BsTableBody extends React.Component {
	render() {
		return (
			<tbody style={this.props.style}>
				{this.renderRows()}
			</tbody>
		);
	}

	renderRows() {
		return this.props.data.map((d, id) => {
			return (
				<tr key={id}>{this.renderColumns(d)}</tr>
			);
		}, this);
	}
	
	renderColumns(rowData) {
		return this.props.columns.map((c, idx) => {
			const {dataAlign} = c;
			return <BsTableBodyColumn key={idx} dataAlign={dataAlign} data={rowData[c.field]}/>;
		}, this);
	}
}

BsTableBody.propTypes = {
	columns: React.PropTypes.array,
	data: React.PropTypes.array
};

export default BsTableBody;