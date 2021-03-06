import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// import AccountTable from './table';
// import UserTable from './bootstrap-table';
// import App from './app.jsx';
// import {Button} from 'react-bootstrap';
import BsTable from './table/BsTable';
import BsTableHeaderColumn from './table/BsTableHeaderColumn';

const users = () => {
  var arr = [], defaultObj = {name: "name", price: 100};
  for (var i = 0; i < 28; i++) {
    arr.push(Object.assign({}, defaultObj, {id: i + 1, price: defaultObj.price + i}));
  }
  return arr;
};

// render(<AccountTable data={users()}/>, document.querySelector("#app"));

const WarpApp = () => {
  return (
    <App>
      <Button bsStyle="info">add-1</Button>
      <Button bsStyle="warning">add-2</Button>
    </App>
  );
};
// render(<WarpApp/>, document.querySelector("#app"));


const Table = () => {
  return (
    <BsTable data={users()} striped bordered condensed hover>
      <BsTableHeaderColumn field="id" dataAlign="center" width="10%">id</BsTableHeaderColumn>
      <BsTableHeaderColumn field="name" dataAlign="center">name</BsTableHeaderColumn>
      <BsTableHeaderColumn field="price" dataAlign="center">price</BsTableHeaderColumn>
    </BsTable>
  );
};
render(<Table/>, document.querySelector("#app"));
