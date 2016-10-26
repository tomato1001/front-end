import React from 'react';

class BsTableHeaderColumn extends React.Component {
  render() {
    const thStyle = {
      textAlign: this.props.dataAlign,
      width: this.props.width,
      borderBottom: 0
    };
    return (
      <th style={thStyle}>{this.props.children}</th>
    );
  }
}

BsTableHeaderColumn.propTypes = {
  dataAlign: React.PropTypes.string,
  field: React.PropTypes.string,
  width: React.PropTypes.string
};

BsTableHeaderColumn.defaultProps = {
  dataAlign: "left"
};

export default BsTableHeaderColumn;