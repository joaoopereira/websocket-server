import express from "express";
import { format } from "date-fns";
import { WebSocketServer, WebSocket } from "ws";
import type { IncomingMessage } from "http";

const app = express();
const port = process.env.PORT || "8081";

// save last message to return when
// a new client connect to the server
let lastMessage: Buffer | undefined;

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    log(`client connected from ip: ${ipv4(req)}`);

    ws.on("message", (message: Buffer) => {
        const messageContent = message.toString();
        log(messageContent);

        if (messageContent === "ping") {
            propagate(Buffer.from("pong"));
        } else {
            lastMessage = message;
            propagate(lastMessage);
        }
    });

    ws.on("error", (error: Error) => {
        log(`WebSocket error: ${error.message}`);
    });

    if (lastMessage) {
        propagate(lastMessage);
    }
});

function propagate(message: Buffer) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            setTimeout(() => {
                client.send(message, { binary: false });
            }, 100);
        }
    });
}

const log = (message: string): void => { 
    console.log(`${format(new Date(), "dd/MM/yyyy HH:mm:ss")} | ${message}`); 
};

const ipv4 = (req: IncomingMessage): string => {
    const remoteAddress = req.socket.remoteAddress ?? "";
    const array = remoteAddress.split(":");
    return array[array.length - 1] ?? "";
};


// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const server = app.listen(port, () => {
    console.log(`websocket server listening at ws://localhost:${port}`);
});

server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
    });
});