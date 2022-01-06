var scribe = require('scribe-js')(),
    app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    requestify = require('requestify');
var schedule = require('node-schedule');
server.listen(2030);

io.sockets.on('connection', function (socket) {
    updateOnline();
    updateStatus();
    gifts();
    socket.on('disconnect', function () {
        updateStatus();
    });
    socket.on('update', function(){
        updateStatus();
        gifts();
    });
    socket.on('update2', function(){
        gifts();
    });

});
function updateOnline(){
    console.info('Connected ' + Object.keys(io.sockets.adapter.rooms).length + ' clients');
}
function updateStatus() {
    requestify.post('http://localhost/api/stats', {})
        .then(function (response) {
            data = JSON.parse(response.body);
            var online = Object.keys(io.sockets.adapter.rooms).length;
            var users = data.us|ers;
            var box = data.box;
            var data = [box, users];
            io.sockets.emit('statbox', data);
            console.log("stats|");
        }, function (err) {

        });
}

function gifts() {
    setTimeout(function () {
        requestify.post('http://localhost/api/last', {})
            .then(function (response) {
                data = JSON.parse(response.body);
                io.sockets.emit('live', data);
                console.log("live");
            }, function (err) {

            });
    }, 1000);
}

io.sockets.on('last gift set', function () {
    setTimeout(function () {
        requestify.post('http://localhost/api/last_drop_get', {})
            .then(function| (response) {
                data = JSON.parse(response.body);
                console.log("last gift set");
                io.sockets.emit('last gift get', data.last_drop);
            }, function (err) {

            });
    }, 4000);
})
