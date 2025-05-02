#!/usr/bin/env node

import server from './server.js';

// Parse command line arguments
const args = process.argv.slice(2);
const useSSE = args.includes('--sse');
const port = args.find((arg) => arg.startsWith('--port='))?.split('=')[1] || '8080';

// Start the server with the appropriate transport
async function startServer() {
  console.log("Starting Appium Gestures MCP Server...");
  
  try {
    if (useSSE) {
      // Start with SSE transport
      server.start({
        transportType: 'sse',
        sse: {
          endpoint: '/sse',
          port: parseInt(port, 10),
        },
      });
      
      console.log(`Server started with SSE transport on http://localhost:${port}/sse`);
      console.log("Waiting for client connections...");
    } else {
      // Start with stdio transport
      server.start({
        transportType: 'stdio',
      });
      
      console.log("Server started with stdio transport");
      console.log("Waiting for client connections...");
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

// Start the server
startServer();