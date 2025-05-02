# MCP Appium Gestures

An MCP (Model Context Protocol) server that provides resources and tools for Appium mobile gestures.

## Overview

This MCP server provides:

1. **Documentation Resources** - Detailed information about common Appium gestures
2. **Code Generation Tools** - Tools to generate code snippets for various gestures

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd mcp-appium-gestures

# Install dependencies
npm install
```

## Usage

### Starting the Server

```bash
npm start
```

This will start the MCP server using stdio transport, which allows it to be used as a command-line tool.

### Available Resources

The server provides documentation resources for common Appium gestures:

- `gesture://tap` - Tap gesture documentation
- `gesture://swipe` - Swipe gesture documentation (horizontal and vertical)
- `gesture://scroll` - Scroll gesture documentation
- `gesture://pinch-zoom` - Pinch and zoom gestures documentation
- `gesture://long-press` - Long press gesture documentation
- `gesture://drag-drop` - Drag and drop gesture documentation
- `gesture://double-tap` - Double tap gesture documentation

You can also access a specific gesture by name using the dynamic resource:

- `gesture://{name}` - Where `{name}` is one of: tap, swipe, scroll, pinch-zoom, long-press, drag-drop, double-tap

### Available Tools

The server provides tools to generate code snippets for various gestures:

#### generate-tap-code

Generates code for a tap gesture.

Parameters:

- `language` (required): "javascript" or "java"
- `useElement` (required): boolean - whether to tap on an element or coordinates
- `elementId` (optional): string - the ID of the element to tap (required if useElement is true)
- `x` (optional): number - x coordinate (required if useElement is false)
- `y` (optional): number - y coordinate (required if useElement is false)

#### generate-swipe-code

Generates code for a swipe gesture.

Parameters:

- `language` (required): "javascript" or "java"
- `startX` (required): number - starting x coordinate
- `startY` (required): number - starting y coordinate
- `endX` (required): number - ending x coordinate
- `endY` (required): number - ending y coordinate
- `duration` (optional): number - swipe duration in milliseconds (default: 500)

#### generate-scroll-code

Generates code for a scroll gesture.

Parameters:

- `language` (required): "javascript" or "java"
- `direction` (required): "up", "down", "left", or "right"
- `useElement` (optional): boolean - whether to scroll to an element (default: false)
- `elementId` (optional): string - the ID of the element to scroll to (required if useElement is true)
- `distance` (optional): number - scroll distance in pixels (default: 300)

#### generate-long-press-code

Generates code for a long press gesture.

Parameters:

- `language` (required): "javascript" or "java"
- `useElement` (required): boolean - whether to long press on an element or coordinates
- `elementId` (optional): string - the ID of the element to long press (required if useElement is true)
- `x` (optional): number - x coordinate (required if useElement is false)
- `y` (optional): number - y coordinate (required if useElement is false)
- `duration` (optional): number - press duration in milliseconds (default: 2000)

#### generate-double-tap-code

Generates code for a double tap gesture.

Parameters:

- `language` (required): "javascript" or "java"
- `useElement` (required): boolean - whether to double tap on an element or coordinates
- `elementId` (optional): string - the ID of the element to double tap (required if useElement is true)
- `x` (optional): number - x coordinate (required if useElement is false)
- `y` (optional): number - y coordinate (required if useElement is false)
- `pauseDuration` (optional): number - pause duration between taps in milliseconds (default: 200)

## Usage with Cline

To use this MCP server with Cline, you have two options:

### Option 1: Install the package globally

```bash
# From the project directory
npm install -g .
```

Then add the following configuration to your Cline MCP settings file:

```json
"mcp-gestures": {
  "autoApprove": [],
  "disabled": false,
  "timeout": 300,
  "command": "npx",
  "args": [
    "mcp-appium-gestures"
  ],
  "transportType": "stdio"
}
```

### Option 2: Use direct path to index.js

Add the following configuration to your Cline MCP settings file:

```json
"mcp-gestures": {
  "autoApprove": [],
  "disabled": false,
  "timeout": 300,
  "command": "node",
  "args": [
    "/path/to/your/workspace/mcp-appium-gestures/src/index.js"
  ],
  "transportType": "stdio"
}
```

Make sure to replace `/path/to/your/workspace` with the actual path to your project directory.

Once configured, you can use the MCP server in Cline by referencing it in your conversations.

## License

MIT
