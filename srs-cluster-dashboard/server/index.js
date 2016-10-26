var srsServer = require('./srs-server');
var srsStream = require('./srs-stream');
var zk = require('./zookeeper');
var db = require('./db');
var express = require('express');
var _ = require('lodash');
const router = express.Router();
const srsForwardServerSync = srsServer.srsForwardServerSync;

const snc = new srsServer.SrsNodeCache({
    "/srs/forwarder": 1,
    "/srs/node": 2,
    "/srs/node-stat": 3
});

zk.client.once('connected', function() {
    snc.start();
});
zk.client.connect();

process.on('SIGTERM', function () {
    zk.client.close();
    db.pool.end();
    console.log('Process exit');
});

router.get("/srs", (req, res) => {
    res.json(snc.getNodes());
});

router.get("/stream", (req, res) => {
    const {offset = 0, size = 10} = req.query;
    srsStream.paginate(offset, size, (result, count, start) => {
        const streams = result.map(v => {
            var fsIp = srsForwardServerSync.keys[v['srs_server_id']];
            if (fsIp) {
                return _.assign({}, v, {fsIp: fsIp});
            }
            return v;
        });
        res.send({
            r: streams,
            c: count,
            start: start
        });
    });
});

module.exports = router;
