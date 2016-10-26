var zk = require('./zookeeper');
var Event = require('node-zookeeper-client/lib/Event')
var _ = require('lodash');
var db = require('./db');

var client = zk.client;
var NODE_TYPES = {
    "FORWARD": {
        "id": 1,
        "name": "转发"
    },
    "NODE": {
        "id": 2,
        "name": "拉流"
    },
    "COUNTER": {
        "id": 3
    }
};

class Node {
    constructor(type, name, maxCount, count) {
        this.type = type;
        this.name = name;
        this.maxCount = maxCount;
        this.count = count;
    }
    
    setVhost(vhost) {
        this.vhost = vhost;
    }

    toJSON() {
        var cname = this.type == Node.FORWARD.id ? Node.FORWARD.name : Node.NODE.name;
        return _.assign({}, this, {
            "cname": cname
        });
    }
}

Object.keys(NODE_TYPES).forEach(k => {
    Node[k] = NODE_TYPES[k];
});


function getChildren(path, watcher, callback) {
    const _watcher = event => {
        console.log("Got watcher event: %s", event);
        watcher(event);
    };

    const _callback = (error, children, stat) => {
        if (error) {
            console.log(
                'Failed to list children of %s due to: %s.',
                path,
                error
            );
            return;
        }
        console.log('Children of %s are: %j.', path, children);
        callback(error, children, stat);
    };
    client.getChildren(path, _watcher, _callback);
}


const QUERY_SRS_ORI_SERVER_SQL = "SELECT id, ip, vhost from srs_origin_server";

class SrsForwardServerSync {
    constructor() {
        this.nodes = {};
        this.keys = {};
        this._intvId = -1;
    }
    
    start() {
        this.sync();
        this._intvId = setInterval(() => this.sync(), 5000);
    }
    
    stop() {
        if (this._intvId > 0) {
            clearInterval(this._intvId);
            this._intvId = -1;
        }
    }
    
    sync() {
        db.query(QUERY_SRS_ORI_SERVER_SQL, (result) => {
            result.forEach(v => {
                const {id, ip} = v;
                this.keys[id] = ip;
                this.nodes[ip] = _.pick(v, ['vhost', 'app_name']);
            });
        });
    }
}

const srsForwardServerSync = new SrsForwardServerSync();
srsForwardServerSync.start();

process.on('SIGTERM', function () {
    srsForwardServerSync.stop();
});

class SrsNodeCache {

    static sortByIp(a, b) {
        let [aNum, bNum] = [parseInt(_.replace(a[0], /\./g, '')), parseInt(_.replace(b[0], /\./g, ''))];
        return aNum - bNum;
    }

    constructor(cfg) {
        this.cfg = cfg;
        this.nodes = {};
    }

    getNodes() {
        return _.chain(this.nodes).map((v, k) => [k, v]).sort(SrsNodeCache.sortByIp).map(v => {
            var o = v[1], fsNode = srsForwardServerSync.nodes[o.name];
            if (fsNode) {
                o.setVhost(fsNode.vhost);
            }
            return o;
        }).value();
    }

    start() {
        _.forIn(this.cfg, (value, key) => this.watcher(key, value));
    }

    watcher(path, type) {
        getChildren(
            path,
            event => this.watcher(path, type),
            (error, children) => children.forEach(name => this.watchChildrenData(path, name, type))
        );
    }

    watchChildrenData(basePath, name, type) {
        const path = basePath + "/" + name;
        const watcher = event => {
            if (event.getType() == Event.NODE_DELETED && type != Node.COUNTER.id) {
                delete this.nodes[name];
            } else {
                this.watchChildrenData(basePath, name, type);
            }
        }
        const callback = (error, data, stat) => {
            if (error) {
                console.log(error.stack);
                return;
            }
            // var nodeData = data.toString('utf8');
            var nodeData = type == Node.FORWARD.id ? undefined : data.readInt32BE();
            if (type == Node.COUNTER.id) {
                var srsNode = this.nodes[name];
                if (srsNode) {
                    srsNode.count = nodeData;
                }
            } else {
                var node = new Node(type, name, nodeData);
                this.nodes[name] = node;
            }
        }
        client.getData(path, watcher, callback);
    }
}

exports.SrsNodeCache = SrsNodeCache;
exports.srsForwardServerSync = srsForwardServerSync;

