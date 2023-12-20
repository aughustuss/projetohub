const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    }
});

io.on("connection", (socket) => {
    console.log(`conectou com o id ${socket.id}`);

    socket.on("chat", (chat) => {
        io.emit("chat", chat);
    })

    socket.on("disconnect", () => {
        console.log("desconectou");
    })
})

server.listen(5000, () => console.log("rodando na porta 5000"))