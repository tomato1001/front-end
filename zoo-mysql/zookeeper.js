var zk = require('node-zookeeper-client');

const client = zk.createClient('172.17.230.194:2181');

exports.client = client;



