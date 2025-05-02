#!/usr/bin/env node

import server from './server.js';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Start the server with stdio transport
async function startServer() {
  console.log("Starting Appium Gestures MCP Server...");
  
  try {
    // Create a stdio transport
    const transport = new StdioServerTransport();
    
    // Connect the server to the transport
    await server.connect(transport);
    
    console.log("Server connected to stdio transport");
    console.log("Waiting for client connections...");
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

// Start the server
startServer();