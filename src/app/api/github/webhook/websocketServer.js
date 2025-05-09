// src/app/api/github/webhook/websocketServer.js
import { WebSocketServer as WSServer } from "ws";
import http from "http";
import { parse } from "url";
import { PrismaClient } from "@prisma/client";
// import prisma from "@/libs/prisma/prisma";
import { auth } from "@clerk/nextjs/server";

// Singleton pattern for WebSocketServer
class WebSocketServer {
  constructor() {
    this.clients = new Map(); // Map client IDs to WebSocket connections
    this.server = null;
    this.prisma = new PrismaClient();
    this.init();
  }

  init() {
    if (this.server) return; // Already initialized

    // Create HTTP server if we're in a production environment
    // In development, we'll attach to Next.js's server
    if (process.env.NODE_ENV === "production") {
      const server = http.createServer();
      this.wss = new WSServer({ server });
      this.setupWebSocketServer();

      server.listen(process.env.WS_PORT || 3001, () => {
        console.log(
          `WebSocket server is running on port ${process.env.WS_PORT || 3001}`
        );
      });
    }
  }

  // Method to attach WebSocket server to an existing HTTP server (for development with Next.js)
  attachToServer(server) {
    this.wss = new WSServer({ server });
    this.setupWebSocketServer();
  }

  setupWebSocketServer() {
    this.wss.on("connection", async (ws, req) => {
      try {
        // Get auth token from query parameters
        const { pathname, query } = parse(req.url, true);
        const token = query.token;

        if (!token) {
          ws.close(1008, "Authentication required");
          return;
        }

        // Verify user authentication
        const { userId } = await auth().verifyToken(token);
        if (!userId) {
          ws.close(1008, "Invalid authentication");
          return;
        }

        // Generate a unique client ID
        const clientId = userId;

        // Store the WebSocket connection
        this.clients.set(clientId, ws);

        // Send initial connection confirmation
        ws.send(
          JSON.stringify({
            type: "CONNECTED",
            message: "WebSocket connection established",
          })
        );

        // Handle messages from client
        ws.on("message", (message) => {
          try {
            const data = JSON.parse(message);
            console.log(`Received message from client ${clientId}:`, data);

            // Handle different message types if needed
            if (data.type === "PING") {
              ws.send(JSON.stringify({ type: "PONG" }));
            }
          } catch (error) {
            console.error("Error handling WebSocket message:", error);
          }
        });

        // Handle connection close
        ws.on("close", () => {
          this.clients.delete(clientId);
          console.log(`Client ${clientId} disconnected`);
        });

        console.log(`Client ${clientId} connected`);
      } catch (error) {
        console.error("Error in WebSocket connection:", error);
        ws.close(1011, "Server error");
      }
    });
  }

  // Method to notify specific client(s) about updates
  notifyClient(clientId, data) {
    const client = this.clients.get(clientId);
    if (client && client.readyState === 1) {
      // 1 = OPEN
      client.send(JSON.stringify(data));
      return true;
    }
    return false;
  }

  // Method to notify all connected clients
  notifyClients(data) {
    let notifiedCount = 0;
    this.clients.forEach((client, clientId) => {
      if (client.readyState === 1) {
        // 1 = OPEN
        client.send(JSON.stringify(data));
        notifiedCount++;
      }
    });
    console.log(`Notified ${notifiedCount} clients about: ${data.type}`);
    return notifiedCount;
  }

  // Method to notify clients who are authorized to access a specific repository
  async notifyRepositoryClients(repositoryId, data) {
    try {
      // Get the repository with its GitHub account
      const repository = await this.prisma.repository.findUnique({
        where: { id: repositoryId },
        include: { githubAccount: true },
      });

      if (!repository) return 0;

      // Get the user ID associated with this repository
      const userId = repository.githubAccount.userId;

      // Notify this specific user
      return this.notifyClient(userId, data) ? 1 : 0;
    } catch (error) {
      console.error("Error notifying repository clients:", error);
      return 0;
    }
  }
}

const websocketServer = new WebSocketServer();
export default websocketServer;
