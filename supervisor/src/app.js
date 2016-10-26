var pace = require('pace');
import React from 'react';
import AppContainer from './components/AppContainer';
import Locations from './components/comment/alt/components/Locations'
// import SampleView from './alts/sample/SampleView'
import SampleView from './alts/sample2/SampleView';

// for pace plugin
pace.start({
	ajax : false,
	document: true
});

// attach to window
global.React = React;

// React.render(<AppContainer/>, document.getElementById('container'));

// React.render(<Locations/>, document.getElementById('container'));
// 
// React.render(<SampleView/>, document.getElementById('container'));
// 

React.render(<SampleView/>, document.getElementById('container'));