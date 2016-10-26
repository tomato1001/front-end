var pace = require('pace');
import React from 'react';
import AppContainer from './components/AppContainer';

// for pace plugin
pace.start({
	ajax : false,
	document: true
});

// attach to window
global.React = React;

React.render(<AppContainer/>, document.getElementById('container'));