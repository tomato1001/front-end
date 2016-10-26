var SrsNodeCache = require('./srs-server');
var srsStream = require('./srs-stream');
var zk = require('./zookeeper');
var db = require('./db');

const snc = new SrsNodeCache({
    "/srs/forwarder": 1,
    "/srs/node": 2,
    "/srs/node-stat": 3
});

zk.client.once('connected', function() {
    snc.start();
});
zk.client.connect();


process.on('SIGTERM', function () {
    snc.stop();
    zk.client.close();
    db.pool.end();
    console.log('Process exit');
});
