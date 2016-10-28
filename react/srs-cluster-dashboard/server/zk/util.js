var zk = require('../zookeeper');

var client = zk.client;

class Node {
    constructor(path, name, watching) {
        this.path = path;
        this.name = name;
        this.isWatching = watching || false;
    }
}

exports.getAndWatchChildren = function(path, childrenCb) {
    
    var watchingNodes = {};
    
    const _callback = (error, children, stat) => {
        if (error) {
            console.log(
                'Failed to list children of %s due to: %s.',
                path,
                error
            );
            return;
        }
        
        children.forEach(name => {
            const nodePath = path + "/" + name;
            const watchingNode = watchingNodes[nodePath];
            if (watchingNode && watchingNode.isWatching) {
                return;
            }
            const _cb = (err, data) => childrenCb(nodePath, data, err);
            const _watcher = event => {
                client.getData(nodePath, _watcher, _cb);
            }
            // getData will react for update/delete node
            watchingNodes[nodePath] = new Node(nodePath, name, true);
            client.getData(nodePath, _watcher, _cb);
        });
    };
    
    const watcher = (event) => {
        client.getChildren(path, watcher, _callback);
    }
    
    client.getChildren(path, watcher, _callback);
    
}

