var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
  return;
});

io.on('connection', function (socket) {
  socket.emit('test', "Hello world!");
  socket.on('h2f', function (data) {
    console.log(data);
  });
});