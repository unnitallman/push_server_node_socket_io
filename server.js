var app = require('http').createServer(handler);

app.listen(3000);

var io    = require('socket.io').listen(app),
    fs    = require('fs'),
    sys   = require('sys'),
    stdin = process.openStdin();


function handler(req, res) {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function(socket) {
  var json  = {};

  stdin.addListener("data", function(d) {
    json.name = d.toString();
    socket.volatile.emit('notification', json);
  });
});
