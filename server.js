var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

var nextClientId = 0;

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/public/app.js', function(req, res){
  res.sendfile('app.js');
});

app.use(express.static('public'));

io.on('connection', function (socket) {
  console.log("Client connected.");
  players[nextClientId] = {};
  socket.emit('id', { id: nextClientId++});
  socket.on('clientUpdate', function (data) {
  	// Reconcile client update with server state
    console.log(data);
    var playerState = players[data['id']];
    playerState['x'] = data['x'];
    playerState['y'] = data['y'];
  });
});

var loop = function() {
	io.emit('update', state);
	setTimeout(loop, 1000);
}

var state = {
	players: {},
}

loop();