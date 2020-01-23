const express = require("express");
const app = express();

const server = app.listen(8000, () =>
    console.log("The server is all fired up on Port 8000")
);

const io = require("socket.io")(server);
const rm1nsp = io.of('/room1');
const rm2nsp = io.of('/room2');
const rm3nsp = io.of('/room3');

io.on("connection", socket => {
    console.log(socket.id);
    console.log("Nice to meet you. (shake hand)");
    socket.on("event_from_client", msg => {
        console.log(msg);
        // socket.emit("new_message_from_server", msg); // send data back to sender
        // socket.broadcast.emit("new_message_from_server", msg); // send data to everyone but sender
        io.emit("new_message_from_server", msg); // send data to everybody
    });
});
