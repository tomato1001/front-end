const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 9091});

wss.on('connection', ws => {

    ws.on('open', () => {
        console.log('connected');
    });
    
    ws.on('message', message => {
        console.log('received: %s', message);
    });
    
    ws.on('close', () => {
        console.log('closed');
    });
    
    ws.send('from server-side');
});