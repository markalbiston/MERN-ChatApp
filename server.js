const express = require("express");
const app = express();

const server = app.listen(8000, () =>
    console.log("The server is all fired up on Port 8000")
);

const io = require("socket.io")(server);

io.on("connection", socket => {
    console.log(socket.id);
    console.log("Nice to meet you. (shake hand)");
    socket.on("event_from_client", data => {
        socket.broadcast.emit("send_data_to_all_other_clients", data);
    });
});