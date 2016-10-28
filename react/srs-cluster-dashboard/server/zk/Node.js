var zk = require('./zookeeper');
var Event = require('node-zookeeper-client/lib/Event');

var client = zk.client;

class Node {

    constructor(name) {
        this.name = name;
    }

}




module.exports = Node;