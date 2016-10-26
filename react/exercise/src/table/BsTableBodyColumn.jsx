import React from 'react';

class BsTableBodyColumn extends React.Component {
  render() {
    const style = {
      textAlign: this.props.dataAlign
    };
    return (
      <td style={style}>{this.props.data}</td>
    );
  }
}

BsTableBodyColumn.propTypes = {
  data: React.PropTypes.any,
  dataAlign: React.PropTypes.string
};

export default BsTableBodyColumn;