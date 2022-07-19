import * as express from "express"
import moment = require("moment");
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
    log(`client connected from ip: ${ipv4(req)}`);

    ws.on("message", (message) => {
        const messageContent = message.toString();
        log(messageContent);

        if (messageContent == "ping") {
            propagate("pong");

        } else {
            lastMessage = message;
            propagate(lastMessage);
        }
    });

    propagate(lastMessage);
});

function propagate(message: any) {
    wss.clients?.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN && message != undefined) {
            setTimeout(function () {
                client.send(
                    Buffer.from(message),
                    { binary: false }
                );
            }, 100);
        }
    });
}

const log = (message: string) => { console.debug(`${moment().format("DD/MM/YYYY HH:mm:ss")} | ${message}`); }
const ipv4 = (req: any) => {
    const remoteAddress = req.socket.remoteAddress ?? "";
    const array = remoteAddress.split(':');
    return array[array.length - 1];
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