var pace = require('pace');
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/AppContainer';
import WebSQLDatabase from './WebSQLDatabase';
// for pace plugin
pace.start({
	ajax : false,
	document: true
});

// attach to window
global.React = React;

ReactDOM.render(<AppContainer/>, document.getElementById('container'));

var wsd = new WebSQLDatabase();
const db = wsd.db;

// Create table and insert one line
// db.transaction(function (tx) {
//   tx.executeSql('CREATE TABLE IF NOT EXISTS foo (id unique, text)');
//   tx.executeSql('INSERT INTO foo (id, text) VALUES (1, "synergies")');
//   tx.executeSql('INSERT INTO foo (id, text) VALUES (2, "luyao")');
// });

// Query out the data
db.transaction(function (tx) {
  tx.executeSql('SELECT * FROM foo', [], function (tx, results) {
    var len = results.rows.length, i;
    for (i = 0; i < len; i++) {
    	const row = results.rows.item(i);
    	console.log(row.id, row.text);
    }
  });
});