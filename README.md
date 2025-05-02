# MCP Appium Gestures

An MCP (Model Context Protocol) server providing resources and tools for Appium mobile gestures.

## Features

- Documentation resources for common Appium mobile gestures:
  - Tap
  - Swipe
  - Scroll
  - Pinch/Zoom
  - Long Press
  - Drag and Drop
  - Double Tap

- Tools to generate code for these gestures in different languages:
  - JavaScript (WebdriverIO v9+ and below)
  - Java (Appium Java Client)

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-appium-gestures.git
cd mcp-appium-gestures

# Install dependencies
npm install
```

## Usage

### Start with stdio transport (for local use)

```bash
# Start the server with stdio transport
npm start
# or
npm run start:stdio
```

### Start with SSE transport (for remote use)

```bash
# Start the server with SSE transport on default port (8080)
npm run start:sse

# Start the server with SSE transport on a custom port
npm run start:sse:port 3000
```

### Development and Testing

```bash
# Test with mcp-cli
npm run dev

# Inspect with MCP Inspector
npm run inspect
```

## Resources

The server provides documentation resources for the following gestures:

- `gesture://tap` - Tap gesture documentation
- `gesture://swipe` - Swipe gesture documentation
- `gesture://scroll` - Scroll gesture documentation
- `gesture://pinch-zoom` - Pinch and zoom gestures documentation
- `gesture://long-press` - Long press gesture documentation
- `gesture://drag-drop` - Drag and drop gesture documentation
- `gesture://double-tap` - Double tap gesture documentation

You can also access a specific gesture by name using the template: `gesture://{name}`

## Tools

The server provides the following tools to generate code for Appium gestures:

### generate-tap-code

Generates code for tap gesture.

Parameters:
- `language`: 'javascript' or 'java'
- `useElement`: boolean - whether to tap on an element or at coordinates
- `elementId`: string (required if useElement is true) - the element ID to tap on
- `x`: number (required if useElement is false) - x coordinate to tap at
- `y`: number (required if useElement is false) - y coordinate to tap at

### generate-swipe-code

Generates code for swipe gesture.

Parameters:
- `language`: 'javascript' or 'java'
- `startX`: number - starting x coordinate
- `startY`: number - starting y coordinate
- `endX`: number - ending x coordinate
- `endY`: number - ending y coordinate
- `duration`: number (optional, default: 500) - duration of the swipe in milliseconds

### generate-scroll-code

Generates code for scroll gesture.

Parameters:
- `language`: 'javascript' or 'java'
- `direction`: 'up', 'down', 'left', or 'right'
- `useElement`: boolean (optional, default: false) - whether to scroll to an element
- `elementId`: string (optional) - the element ID to scroll to
- `distance`: number (optional, default: 300) - distance to scroll

### generate-long-press-code

Generates code for long press gesture.

Parameters:
- `language`: 'javascript' or 'java'
- `useElement`: boolean - whether to long press on an element or at coordinates
- `elementId`: string (required if useElement is true) - the element ID to long press on
- `x`: number (required if useElement is false) - x coordinate to long press at
- `y`: number (required if useElement is false) - y coordinate to long press at
- `duration`: number (optional, default: 2000) - duration of the long press in milliseconds

### generate-double-tap-code

Generates code for double tap gesture.

Parameters:
- `language`: 'javascript' or 'java'
- `useElement`: boolean - whether to double tap on an element or at coordinates
- `elementId`: string (required if useElement is true) - the element ID to double tap on
- `x`: number (required if useElement is false) - x coordinate to double tap at
- `y`: number (required if useElement is false) - y coordinate to double tap at
- `pauseDuration`: number (optional, default: 200) - pause duration between taps in milliseconds

## License

MIT
