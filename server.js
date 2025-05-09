// server.js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const WebSocketServer =
  require("./src/app/api/github/webhook/websocketServer").default;

console.log("server.js");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Attach WebSocket server to HTTP server
  WebSocketServer.attachToServer(server);

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
