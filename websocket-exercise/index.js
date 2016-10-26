const server = require('http').createServer(),
    url = require('url'),
    WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({server: server}),
    express = require('express'),
    app = express(),
    port = 4080,
    path = require('path');

app.use(function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

wss.on('connection', function connection(ws) {
  
  ws.on('message', function incoming(message) {
    console.log(JSON.parse(message));
  });
  
});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });


wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

setInterval(() => {
    wss.broadcast(JSON.stringify({msg: 'response from server'}));
}, 3000);
