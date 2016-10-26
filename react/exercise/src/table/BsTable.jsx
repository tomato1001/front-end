'use strict';
import React from 'react';
import {Table, Grid, Row, Col} from 'react-bootstrap';
import BsTableBody from './BsTableBody';
import BsTableHeader from './BsTableHeader';

class BsTable extends React.Component {
  render() {
    const columns = this.getColumns(this.props.children);
    return (
      <Grid>
          <Row className="show-grid">
            <Table 
              striped={this.props.striped}
              bordered={this.props.bordered}
              condensed={this.props.condensed}
              hover={this.props.hover}
              className={this.props.className}>
              <BsTableHeader>
                {this.props.children}
              </BsTableHeader>
              <BsTableBody columns={columns} data={this.props.data}/>
            </Table>
          </Row>
          <Row className={"show-grid"}>
            <Col md={6}>
              <span>当前第1-10</span>
            </Col>
            <Col md={6}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
          </Row>
      </Grid>
    );
  }
  
  getColumns(children) {
    return React.Children.map(children, c => {
      var {field, dataAlign} = c.props;
      return {
        field: field,
        dataAlign: dataAlign
      };
    });
  }
}

BsTable.propTypes = {
  data: React.PropTypes.array,
  striped: React.PropTypes.bool,
  bordered: React.PropTypes.bool,
  condensed: React.PropTypes.bool,
  hover: React.PropTypes.bool,
  className: React.PropTypes.string
};

export default BsTable;
