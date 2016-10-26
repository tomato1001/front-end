var Signal = require('signals');

var myObject = {
	started : new Signal(),
	stopped : new Signal()
};

function onStarted (p1, p2) {
	console.log('onStarted: ', p1, p2);
}

function onStarted2 (p1, p2) {
	console.log('onStarted2: ', p1, p2);
}

myObject.started.add(onStarted);
myObject.started.add(onStarted2);

myObject.started.dispatch('a', 'b');
