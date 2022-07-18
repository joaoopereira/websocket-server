import * as express from "express"
import { WebSocketServer, WebSocket } from "ws";

const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
    port = "8081";
}

// save last message to return when
// a new client connect to the server
let lastMessage: any;

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws, req) => {
    console.debug(`client connected from ip: ${req.socket.remoteAddress}`);
    ws.on("message", (message) => {
        lastMessage = message;

        // propagate message to all clients
        wss.clients?.forEach(function each(client) {
            sendMessage(client);
        });

        console.debug(message.toString());
    });

    wss.clients?.forEach(function each(client) {
        sendMessage(client);
    });
});

function sendMessage(client: WebSocket) {
    if (client.readyState === WebSocket.OPEN && lastMessage != undefined) {
        setTimeout(function () {
            client.send(
                Buffer.from(lastMessage),
                { binary: false }
            );
        }, 100);
    }
}

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const server = app.listen(port, () => {
    console.log(`websocket server listening at ws://localhost:${port}`);
});

server.on("upgrade", (request, ws, head) => {
    wss.handleUpgrade(request, ws, head, (ws) => {
        wss.emit("connection", ws, request);
    });
});