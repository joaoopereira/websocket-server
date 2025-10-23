# WebSocket Server

A simple Node.js WebSocket server built with Express and the `ws` library.

## Features

- WebSocket server with Express integration
- Broadcasts messages to all connected clients
- Ping/pong heartbeat mechanism
- TypeScript support
- Modern ES modules and dependencies

## Requirements

- Node.js 20.19.5 or later (see `.node-version`)
- npm or yarn

## Installation

```bash
npm install
```

## Development

Run the server in development mode with auto-reload:

```bash
npm run dev
```

## Production

Build and run in production:

```bash
npm run build
npm start
```

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the production server
- `npm run dev` - Run in development mode with auto-reload
- `npm run lint` - Lint the codebase
- `npm run lint:fix` - Lint and fix issues automatically

## Environment Variables

- `PORT` - Server port (default: 8081)

## WebSocket Protocol

The server accepts WebSocket connections and supports the following:

- Send any message to broadcast it to all connected clients
- Send `"ping"` to receive a `"pong"` response
- New clients receive the last broadcast message upon connection

## Connection

Connect to the WebSocket server at:

```
ws://localhost:8081
```

## License

ISC
