const zkUtils = require('./zk/util');
var zk = require('./zookeeper');





const childrenCb = (path, data) => {
    console.log(path);
}

zk.client.once('connected', function() {
    
    zkUtils.getAndWatchChildren('/cc', childrenCb);
});
zk.client.connect();




