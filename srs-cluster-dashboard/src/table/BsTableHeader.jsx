import React from 'react';

class BsTableHeader extends React.Component {
  render() {
    return (
      <thead>
        <tr>
          {this.props.children}
        </tr>
      </thead>
    );
  }
}

export default BsTableHeader;