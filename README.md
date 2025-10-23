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

## Development Container

This project includes a VS Code devcontainer configuration for a consistent development environment. The devcontainer includes:
- Node.js 20 with TypeScript support
- ESLint and Prettier extensions pre-configured
- Automatic dependency installation on container creation
- Port forwarding for the WebSocket server (8081)

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
- `npm test` - Run tests with Jest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

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

## Testing

The project includes comprehensive tests using Jest. Tests cover:
- WebSocket connection handling
- Ping/pong protocol
- Message broadcasting
- Helper functions

Run tests with:
```bash
npm test
```

For continuous testing during development:
```bash
npm run test:watch
```

To generate a coverage report:
```bash
npm run test:coverage
```

## License

ISC
