var emitter = require('event-emitter')({});

var startListener = function (p) {
	console.log('test:start ', p);
}

emitter.on('test:start', startListener);

emitter.emit('test:start', '1', '2');
emitter.off('test:start', startListener);
emitter.emit('test:start', '3', '4');