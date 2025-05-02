import {
  McpServer,
  ResourceTemplate,
} from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

// Create an MCP server
const server = new McpServer({
  name: 'Appium Gestures',
  version: '1.0.0',
  description:
    'MCP server providing resources and tools for Appium mobile gestures',
});

// ===== RESOURCES =====

// Resource for tap gesture documentation
server.resource('tap-gesture', 'gesture://tap', async (uri) => ({
  contents: [
    {
      uri: uri.href,
      text: `
# Tap Gesture in Appium

The tap gesture simulates a finger tap on a specific element or at specific coordinates on the screen.

## WebdriverIO Example (v9+)
\`\`\`javascript
// Tap on an element
const elem = $('~myElement');
// It will automatically scroll to the element if it's not already in the viewport
await elem.tap();

// Tap with custom options
await elem.tap({
    direction: 'right',
    maxScrolls: 3,
    scrollableElement: $('#scrollable')
});

// Tap at specific coordinates
await browser.tap({ x: 200, y: 400 });
\`\`\`

## WebdriverIO Example (below v9)
\`\`\`javascript
// Using the Gestures helper class
const { x, y } = await element.getLocation();
const finger = {
    x: Math.round(x + (await element.getSize()).width / 2),
    y: Math.round(y + (await element.getSize()).height / 2)
};

// Execute tap gesture
await driver
    .action('pointer')
    .move(finger.x, finger.y)
    .down()
    .pause(100)
    .up()
    .perform();
\`\`\`

## Appium Java Client Example (W3C Actions API)
\`\`\`java
// Find the element to tap on
driver.findElement(AppiumBy.accessibilityId("slider")).click();

// Or using W3C Actions API for more control
WebElement element = driver.findElement(AppiumBy.accessibilityId("slider"));
Point source = element.getLocation();
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence sequence = new Sequence(finger, 1);

// Press and release (tap)
sequence.addAction(finger.createPointerMove(Duration.ofMillis(0),
        PointerInput.Origin.viewport(), source.x, source.y));
sequence.addAction(finger.createPointerDown(PointerInput.MouseButton.MIDDLE.asArg()));
sequence.addAction(finger.createPointerUp(PointerInput.MouseButton.MIDDLE.asArg()));

// Perform the action
driver.perform(Collections.singletonList(sequence));
\`\`\`

The W3C Actions API is the recommended approach for Appium as it provides more precise control over pointer movements and is more reliable across different platforms.
      `,
    },
  ],
}));

// Resource for swipe gesture documentation
server.resource('swipe-gesture', 'gesture://swipe', async (uri) => ({
  contents: [
    {
      uri: uri.href,
      text: `
# Swipe Gesture in Appium

The swipe gesture simulates a finger swipe from one point to another on the screen. There are four main directions: up, down, left, and right.

## WebdriverIO Example (v9+)
\`\`\`javascript
// Default swipe (up direction)
await browser.swipe();

// Swipe with options
await browser.swipe({
    direction: 'left',                  // Swipe from right to left
    duration: 5000,                     // Last for 5 seconds
    percent: 0.5,                       // Swipe 50% of the scrollableElement
    scrollableElement: $('~carousel'),  // The element to swipe within
});

// Swipe on an element
const element = $('~myElement');
await element.swipe({ direction: 'up' });
\`\`\`

## WebdriverIO Example (below v9)
\`\`\`javascript
// Using the Gestures helper class
class Gestures {
    static async executeGesture ({ from, to }) {
        await driver
            .action('pointer')
            .move(from.x, from.y)
            .down()
            .pause(100)
            .move({ duration: 1000, x: to.x, y: to.y })
            .up()
            .perform();
            
        await driver.pause(1000);
    }
}

// Get element dimensions
const { x, y, width, height } = await driver.getElementRect(element.elementId);

// Swipe left to right
await Gestures.executeGesture({
    from: { x: x + width * 0.1, y: y + height / 2 },
    to: { x: x + width * 0.9, y: y + height / 2 }
});

// Swipe down
await Gestures.executeGesture({
    from: { x: x + width / 2, y: y + height * 0.1 },
    to: { x: x + width / 2, y: y + height * 0.9 }
});
\`\`\`

## Appium Java Client Example (W3C Actions API)
\`\`\`java
// Horizontal swipe using W3C Actions API
// First find the element to swipe on
wait.until(presenceOfElementLocated(AppiumBy.accessibilityId("slider")));
WebElement slider = driver.findElement(AppiumBy.accessibilityId("slider"));
Point source = slider.getLocation();

// Create a finger gesture with touch pointer
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence sequence = new Sequence(finger, 1);

// Press, move and release
sequence.addAction(finger.createPointerMove(Duration.ofMillis(0),
        PointerInput.Origin.viewport(), source.x, source.y));
sequence.addAction(finger.createPointerDown(PointerInput.MouseButton.MIDDLE.asArg()));
sequence.addAction(finger.createPointerMove(Duration.ofMillis(600),
        PointerInput.Origin.viewport(), source.x + 400, source.y));
sequence.addAction(finger.createPointerUp(PointerInput.MouseButton.MIDDLE.asArg()));

// Perform the action
driver.perform(Collections.singletonList(sequence));

// Vertical swipe implementation
private void verticalSwipe(String locator) throws InterruptedException {
  WebElement slider = driver.findElement(AppiumBy.accessibilityId(locator));
  Point source = slider.getLocation();
  PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
  Sequence sequence = new Sequence(finger, 1);
  
  sequence.addAction(finger.createPointerMove(Duration.ofMillis(0),
          PointerInput.Origin.viewport(), source.x / 2, source.y + 400));
  sequence.addAction(finger.createPointerDown(PointerInput.MouseButton.MIDDLE.asArg()));
  sequence.addAction(finger.createPointerMove(Duration.ofMillis(600),
          PointerInput.Origin.viewport(), source.getX() / 2, source.y / 2));
  sequence.addAction(finger.createPointerUp(PointerInput.MouseButton.MIDDLE.asArg()));
  
  driver.perform(Collections.singletonList(sequence));
}

// Alternative using executeScript with gesture plugin
driver.executeScript("gesture: swipe", ImmutableMap.of(
    "elementId", slider.getId(),
    "percentage", 50
));
\`\`\`
      `,
    },
  ],
}));

// Resource for scroll gesture documentation
server.resource('scroll-gesture', 'gesture://scroll', async (uri) => ({
  contents: [
    {
      uri: uri.href,
      text: `
# Scroll Gesture in Appium

The scroll gesture simulates scrolling on the screen, typically used to navigate through lists or pages.

## WebdriverIO Example (v9+)
\`\`\`javascript
// Default swipe (up direction) - which is a scroll down
await browser.swipe();

// Scroll with options
await browser.swipe({
    direction: 'up',                    // Scroll down
    duration: 1500,                     // Last for 1.5 seconds
    percent: 0.8,                       // Swipe 80% of the scrollableElement
    scrollableElement: $('~scrollView') // The element to scroll within
});

// Scroll to an element
await $('~target-element').scrollIntoView();
\`\`\`

## WebdriverIO Example (below v9)
\`\`\`javascript
// Using the Gestures helper class
class Gestures {
    static async checkIfDisplayedWithSwipe({
        scrollContainer,
        searchableElement,
        maxScrolls,
        amount = 0,
        direction = 'down',
        percentage = 0.99
    }) {
        // If the element is not displayed and we haven't scrolled the max amount
        if (!await searchableElement.isDisplayed() && amount <= maxScrolls) {
            // Calculate scroll coordinates based on container
            const { x, y, width, height } = await driver.getElementRect(scrollContainer.elementId);
            const scrollRectangles = {
                top: { x: Math.round(x + width / 2), y: Math.round(y + height * percentage) },
                bottom: { x: Math.round(x + width / 2), y: Math.round(y + height - height * percentage) }
            };
            
            // Scroll down (swipe up)
            await this.executeGesture({
                from: scrollRectangles.bottom,
                to: scrollRectangles.top
            });
            
            // Check again with incremented scroll count
            await this.checkIfDisplayedWithSwipe({
                scrollContainer,
                searchableElement,
                maxScrolls,
                amount: amount + 1,
                direction,
                percentage
            });
        } else if (amount > maxScrolls) {
            throw new Error('Element could not be found or is not visible.');
        }
    }
    
    static async executeGesture({ from, to }) {
        await driver
            .action('pointer')
            .move(from.x, from.y)
            .down()
            .pause(100)
            .move({ duration: 1000, x: to.x, y: to.y })
            .up()
            .perform();
    }
}

// Scroll down example
const scrollContainer = $('~scrollView');
const targetElement = $('~target-element');
await Gestures.checkIfDisplayedWithSwipe({
    scrollContainer,
    searchableElement: targetElement,
    maxScrolls: 5
});
\`\`\`

## Appium Java Client Example (W3C Actions API)
\`\`\`java
// Scroll down using W3C Actions API
WebElement scrollView = driver.findElement(AppiumBy.accessibilityId("scrollView"));
Point source = scrollView.getLocation();
Dimension size = scrollView.getSize();

// Create a finger gesture with touch pointer
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence sequence = new Sequence(finger, 1);

// Press at bottom, move to top (scroll down)
sequence.addAction(finger.createPointerMove(Duration.ofMillis(0),
        PointerInput.Origin.viewport(), source.x + size.width / 2, source.y + size.height * 0.8));
sequence.addAction(finger.createPointerDown(PointerInput.MouseButton.MIDDLE.asArg()));
sequence.addAction(finger.createPointerMove(Duration.ofMillis(600),
        PointerInput.Origin.viewport(), source.x + size.width / 2, source.y + size.height * 0.2));
sequence.addAction(finger.createPointerUp(PointerInput.MouseButton.MIDDLE.asArg()));

// Perform the action
driver.perform(Collections.singletonList(sequence));

// Scroll to an element (Android)
driver.findElement(AppiumBy.androidUIAutomator(
  "new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView("
  + "new UiSelector().text(\"target text\"))"));
\`\`\`
      `,
    },
  ],
}));

// Resource for pinch/zoom gesture documentation
server.resource('pinch-zoom-gesture', 'gesture://pinch-zoom', async (uri) => ({
  contents: [
    {
      uri: uri.href,
      text: `
# Pinch and Zoom Gestures in Appium

These gestures simulate pinching (zoom out) and zooming (zoom in) on the screen, commonly used for image manipulation.

## WebdriverIO Example (v9+)
\`\`\`javascript
// Pinch (zoom out) on an element
const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]');
// Pinch with the default duration scale
await mapsElement.pinch();
// Pinch with a custom duration and scale
await mapsElement.pinch({ duration: 4000, scale: 0.9 });

// Zoom (zoom in) on an element
// Zoom with the default duration scale
await mapsElement.zoom();
// Zoom with a custom duration and scale
await mapsElement.zoom({ duration: 4000, scale: 0.9 });
\`\`\`

## WebdriverIO Example (below v9)
\`\`\`javascript
// For WebdriverIO below v9, touchAction is used for pinch/zoom
// Zoom in (spread)
await driver.touchAction([
  [
    { action: 'press', x: 150, y: 150 },
    { action: 'moveTo', x: 100, y: 100 },
    { action: 'release' }
  ],
  [
    { action: 'press', x: 150, y: 150 },
    { action: 'moveTo', x: 200, y: 200 },
    { action: 'release' }
  ]
]);

// Zoom out (pinch)
await driver.touchAction([
  [
    { action: 'press', x: 100, y: 100 },
    { action: 'moveTo', x: 150, y: 150 },
    { action: 'release' }
  ],
  [
    { action: 'press', x: 200, y: 200 },
    { action: 'moveTo', x: 150, y: 150 },
    { action: 'release' }
  ]
]);
\`\`\`

## Appium Java Client Example (W3C Actions API)
\`\`\`java
// Implementation from VodQaAdvancedAppium repository
@Test
public void pinchAndZoom() throws InterruptedException {
  // Setup
  login();
  Thread.sleep(5000);
  driver.findElement(AppiumBy.accessibilityId("photoView")).click();
  
  // Get the image element
  WebElement element = new WebDriverWait(driver, Duration.ofMillis(30))
          .until(elementToBeClickable(AppiumBy.accessibilityId("photo")));
  
  Point source = element.getLocation();
  PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
  
  // First finger - creates first sequence of actions
  Sequence pinchAndZoom1 = new Sequence(finger, 0);
  pinchAndZoom1.addAction(finger.createPointerMove(Duration.ofMillis(0),
          PointerInput.Origin.viewport(), source.x / 2, source.y / 2));
  pinchAndZoom1.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
  pinchAndZoom1.addAction(new Pause(finger, Duration.ofMillis(100)));
  pinchAndZoom1.addAction(finger.createPointerMove(Duration.ofMillis(600),
          PointerInput.Origin.viewport(), source.x / 3, source.y / 3));
  pinchAndZoom1.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));
  
  // Second finger - creates second sequence of actions
  PointerInput finger2 = new PointerInput(PointerInput.Kind.TOUCH, "finger2");
  Sequence pinchAndZoom2 = new Sequence(finger2, 0);
  pinchAndZoom2.addAction(finger2.createPointerMove(Duration.ofMillis(0),
          PointerInput.Origin.viewport(), source.x / 2, source.y / 2));
  pinchAndZoom2.addAction(finger2.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
  pinchAndZoom2.addAction(new Pause(finger, Duration.ofMillis(100)));
  pinchAndZoom2.addAction(finger2.createPointerMove(Duration.ofMillis(600),
          PointerInput.Origin.viewport(), source.x * 3 / 4, source.y * 3 / 4));
  pinchAndZoom2.addAction(finger2.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));
  
  // Perform both sequences
  driver.perform(Arrays.asList(pinchAndZoom1, pinchAndZoom2));
}
\`\`\`

The W3C Actions API is the recommended approach for complex gestures in Appium Java client as it provides more precise control over multi-touch interactions.
      `,
    },
  ],
}));

// Resource for long press gesture documentation
server.resource('long-press-gesture', 'gesture://long-press', async (uri) => ({
  contents: [
    {
      uri: uri.href,
      text: `
# Long Press Gesture in Appium

The long press gesture simulates pressing and holding a finger on a specific element or at specific coordinates.

## WebdriverIO Example (v9+)
\`\`\`javascript
// Long press on an element
const contacts = $('~Contacts');
// Long press with default duration (1500ms)
await contacts.longPress();
// Long press with custom duration and offset
await contacts.longPress({ duration: 5000 }); // 5 seconds
// Long press with offset from center point of element
await contacts.longPress({ x: 30, y: 10 });
\`\`\`

## WebdriverIO Example (below v9)
\`\`\`javascript
// Long press on an element
await $('~element-id').touchAction('longPress');

// Long press at specific coordinates
await driver.touchAction([
  { action: 'longPress', x: 100, y: 200, ms: 2000 },
  { action: 'release' }
]);
\`\`\`

## Appium Java Client Example (W3C Actions API)
\`\`\`java
// Long press on an element
WebElement element = driver.findElement(AppiumBy.accessibilityId("elementId"));
Point source = element.getLocation();
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence sequence = new Sequence(finger, 1);

// Move to element, press down, wait, then release
sequence.addAction(finger.createPointerMove(Duration.ofMillis(0),
        PointerInput.Origin.viewport(), source.x, source.y));
sequence.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
// Hold for 2 seconds (2000 milliseconds)
sequence.addAction(new Pause(finger, Duration.ofMillis(2000)));
sequence.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));

// Perform the action
driver.perform(Collections.singletonList(sequence));

// Long press at specific coordinates
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence sequence = new Sequence(finger, 1);

sequence.addAction(finger.createPointerMove(Duration.ofMillis(0),
        PointerInput.Origin.viewport(), 100, 200));
sequence.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
// Hold for 2 seconds (2000 milliseconds)
sequence.addAction(new Pause(finger, Duration.ofMillis(2000)));
sequence.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));

// Perform the action
driver.perform(Collections.singletonList(sequence));
\`\`\`
      `,
    },
  ],
}));

// Resource for drag and drop gesture documentation
server.resource('drag-drop-gesture', 'gesture://drag-drop', async (uri) => ({
  contents: [
    {
      uri: uri.href,
      text: `
# Drag and Drop Gesture in Appium

The drag and drop gesture simulates dragging an element from one location to another, commonly used in UI testing for moving items between containers.

## WebdriverIO Example (v9+)
\`\`\`javascript
// Drag and drop element to another element
const elem = $('#someElem');
const target = $('#someTarget');
await elem.dragAndDrop(target);

// Drag and drop relative from current position
await elem.dragAndDrop({ x: 100, y: 200 });

// Drag and drop with custom duration
await elem.dragAndDrop(target, { duration: 2000 }); // 2 seconds
\`\`\`

## WebdriverIO Example (below v9)
\`\`\`javascript
// Drag and drop using coordinates with touchAction
await driver.touchAction([
  { action: 'press', x: 100, y: 200 },
  { action: 'wait', ms: 500 },
  { action: 'moveTo', x: 300, y: 400 },
  { action: 'release' }
]);

// Using the Gestures helper class
const { x: sourceX, y: sourceY } = await sourceElem.getLocation();
const { x: targetX, y: targetY } = await targetElem.getLocation();

await driver
  .action('pointer')
  .move(sourceX, sourceY)
  .down()
  .pause(500)
  .move({ duration: 1000, x: targetX, y: targetY })
  .up()
  .perform();
\`\`\`

## Appium Java Client Example
\`\`\`java
// Implementation from VodQaAdvancedAppium repository
// Find the element to drag
WebElement dragMe = new WebDriverWait(driver, Duration.ofSeconds(30))
        .until(elementToBeClickable(AppiumBy.accessibilityId("dragMe")));

// Get source location
Point source = dragMe.getLocation();

// Find the drop target
Point target = driver.findElement(AppiumBy.accessibilityId("dropzone")).getLocation();

// Create finger gesture with touch pointer
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence dragNDrop = new Sequence(finger, 1);

// Press, move and release
dragNDrop.addAction(finger.createPointerMove(Duration.ofMillis(0),
        PointerInput.Origin.viewport(), source.x, source.y));
dragNDrop.addAction(finger.createPointerDown(PointerInput.MouseButton.MIDDLE.asArg()));
dragNDrop.addAction(finger.createPointerMove(Duration.ofMillis(600),
        PointerInput.Origin.viewport(), target.x, target.y));
dragNDrop.addAction(finger.createPointerUp(PointerInput.MouseButton.MIDDLE.asArg()));

// Perform the action
driver.perform(Collections.singletonList(dragNDrop));

// Verify the drop was successful
assertEquals(driver.findElements(AppiumBy.accessibilityId("success")).size(), 1);
\`\`\`

This implementation uses the W3C Actions API which provides more precise control over pointer movements and is the recommended approach in newer versions of Appium.
      `,
    },
  ],
}));

// Resource for double tap gesture documentation
server.resource('double-tap-gesture', 'gesture://double-tap', async (uri) => ({
  contents: [
    {
      uri: uri.href,
      text: `
# Double Tap Gesture in Appium

The double tap gesture simulates tapping twice in quick succession on the same location, commonly used for zooming in on maps or images.

## WebdriverIO Example (v9+)
\`\`\`javascript
// Double tap on an element
// Note: In WebdriverIO v9+, you can use the doubleClick method
const element = $('~element-id');
await element.doubleClick();
\`\`\`

## WebdriverIO Example (below v9)
\`\`\`javascript
// Double tap at specific coordinates using touchAction
await driver.touchAction([
  { action: 'tap', x: 100, y: 200 },
  { action: 'wait', ms: 100 },
  { action: 'tap', x: 100, y: 200 }
]);

// Using the Gestures helper class
const { x, y } = await element.getLocation();
const centerX = x + (await element.getSize()).width / 2;
const centerY = y + (await element.getSize()).height / 2;

// Execute double tap gesture
await driver
  .action('pointer')
  .move(centerX, centerY)
  .down()
  .up()
  .pause(100)
  .down()
  .up()
  .perform();
\`\`\`

## Appium Java Client Example
\`\`\`java
// Implementation from VodQaAdvancedAppium repository
@Test
public void doubleTap() throws InterruptedException {
  // Setup
  login();
  Thread.sleep(5000);
  driver.findElement(AppiumBy.accessibilityId("doubleTap")).click();
  
  // Get the element to double tap
  WebElement element = new WebDriverWait(driver, Duration.ofMillis(30))
          .until(elementToBeClickable(AppiumBy.accessibilityId("doubleTapMe")));
  
  // Get element location
  Point source = element.getLocation();
  
  // Create finger gesture with touch pointer
  PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
  Sequence tap = new Sequence(finger, 1);
  
  // First tap
  tap.addAction(finger.createPointerMove(Duration.ofMillis(0),
          PointerInput.Origin.viewport(), source.x, source.y));
  tap.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
  tap.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));
  
  // Small pause between taps
  tap.addAction(new Pause(finger, Duration.ofMillis(200)));
  
  // Second tap
  tap.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
  tap.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));
  
  // Perform the action
  driver.perform(Collections.singletonList(tap));
  
  // Wait to see the result
  Thread.sleep(4000);
}
\`\`\`

This implementation uses the W3C Actions API which provides more precise control over pointer movements and timing, and is the recommended approach in newer versions of Appium.
`,
    },
  ],
}));

// Dynamic resource for gesture documentation by name
server.resource(
  'gesture-by-name',
  new ResourceTemplate('gesture://{name}', { list: undefined }),
  async (uri, { name }) => {
    // Map of supported gestures
    const gestures = {
      tap: 'gesture://tap',
      swipe: 'gesture://swipe',
      scroll: 'gesture://scroll',
      'pinch-zoom': 'gesture://pinch-zoom',
      'long-press': 'gesture://long-press',
      'drag-drop': 'gesture://drag-drop',
      'double-tap': 'gesture://double-tap',
    };

    if (!gestures[name]) {
      return {
        contents: [
          {
            uri: uri.href,
            text: `Gesture "${name}" not found. Available gestures: ${Object.keys(
              gestures
            ).join(', ')}`,
          },
        ],
      };
    }

    // Redirect to the specific gesture resource
    return {
      contents: [
        {
          uri: uri.href,
          text: `Redirecting to ${gestures[name]}...`,
        },
      ],
    };
  }
);

// ===== TOOLS =====

// Tool to generate tap gesture code
server.tool(
  'generate-tap-code',
  {
    language: z.enum(['javascript', 'java']),
    useElement: z.boolean(),
    elementId: z.string().optional(),
    x: z.number().optional(),
    y: z.number().optional(),
  },
  async ({ language, useElement, elementId, x, y }) => {
    let code = '';

    if (useElement && !elementId) {
      return {
        content: [
          {
            type: 'text',
            text: 'Error: elementId is required when useElement is true',
          },
        ],
        isError: true,
      };
    }

    if (!useElement && (x === undefined || y === undefined)) {
      return {
        content: [
          {
            type: 'text',
            text: 'Error: x and y coordinates are required when useElement is false',
          },
        ],
        isError: true,
      };
    }

    if (language === 'javascript') {
      if (useElement) {
        code = `// For WebdriverIO v9+
const element = $('~${elementId}');
// It will automatically scroll to the element if it's not already in the viewport
await element.tap();

// For WebdriverIO below v9
await $('~${elementId}').click();`;
      } else {
        code = `// For WebdriverIO v9+
await browser.tap({ x: ${x}, y: ${y} });

// For WebdriverIO below v9
// Option 1: Using touchAction
await driver.touchAction([
  { action: 'tap', x: ${x}, y: ${y} }
]);

// Option 2: Using action API
await driver
  .action('pointer')
  .move(${x}, ${y})
  .down()
  .up()
  .perform();`;
      }
    } else if (language === 'java') {
      if (useElement) {
        code = `// Using W3C Actions API (recommended)
WebElement element = driver.findElement(AppiumBy.accessibilityId("${elementId}"));
Point source = element.getLocation();
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence sequence = new Sequence(finger, 1);

// Press and release (tap)
sequence.addAction(finger.createPointerMove(Duration.ofMillis(0),
        PointerInput.Origin.viewport(), source.x, source.y));
sequence.addAction(finger.createPointerDown(PointerInput.MouseButton.MIDDLE.asArg()));
sequence.addAction(finger.createPointerUp(PointerInput.MouseButton.MIDDLE.asArg()));

// Perform the action
driver.perform(Collections.singletonList(sequence));

// Alternative: Simple click
// element.click();`;
      } else {
        code = `// Using W3C Actions API (recommended)
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence sequence = new Sequence(finger, 1);

// Press and release (tap)
sequence.addAction(finger.createPointerMove(Duration.ofMillis(0),
        PointerInput.Origin.viewport(), ${x}, ${y}));
sequence.addAction(finger.createPointerDown(PointerInput.MouseButton.MIDDLE.asArg()));
sequence.addAction(finger.createPointerUp(PointerInput.MouseButton.MIDDLE.asArg()));

// Perform the action
driver.perform(Collections.singletonList(sequence));`;
      }
    }

    return {
      content: [{ type: 'text', text: code }],
    };
  }
);

// Tool to generate swipe gesture code
server.tool(
  'generate-swipe-code',
  {
    language: z.enum(['javascript', 'java']),
    startX: z.number(),
    startY: z.number(),
    endX: z.number(),
    endY: z.number(),
    duration: z.number().default(500),
  },
  async ({ language, startX, startY, endX, endY, duration }) => {
    let code = '';

    if (language === 'javascript') {
      code = `// For WebdriverIO v9+
// Calculate direction based on coordinates
const direction = ${
        startX === endX
          ? startY > endY
            ? "'up'"
            : "'down'"
          : startX > endX
          ? "'left'"
          : "'right'"
      };

await browser.swipe({
  direction: ${
    startX === endX
      ? startY > endY
        ? "'up'"
        : "'down'"
      : startX > endX
      ? "'left'"
      : "'right'"
  },
  duration: ${duration}
});

// For WebdriverIO below v9
// Option 1: Using touchAction
await driver.touchAction([
  { action: 'press', x: ${startX}, y: ${startY} },
  { action: 'wait', ms: ${duration} },
  { action: 'moveTo', x: ${endX}, y: ${endY} },
  { action: 'release' }
]);

// Option 2: Using action API
await driver
  .action('pointer')
  .move(${startX}, ${startY})
  .down()
  .pause(100)
  .move({ duration: ${duration}, x: ${endX}, y: ${endY} })
  .up()
  .perform();`;
    } else if (language === 'java') {
      code = `// Using W3C Actions API (recommended)
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence sequence = new Sequence(finger, 1);

// Press, move and release
sequence.addAction(finger.createPointerMove(Duration.ofMillis(0),
        PointerInput.Origin.viewport(), ${startX}, ${startY}));
sequence.addAction(finger.createPointerDown(PointerInput.MouseButton.MIDDLE.asArg()));
sequence.addAction(finger.createPointerMove(Duration.ofMillis(${duration}),
        PointerInput.Origin.viewport(), ${endX}, ${endY}));
sequence.addAction(finger.createPointerUp(PointerInput.MouseButton.MIDDLE.asArg()));

// Perform the action
driver.perform(Collections.singletonList(sequence));`;
    }

    return {
      content: [{ type: 'text', text: code }],
    };
  }
);

// Tool to generate scroll gesture code
server.tool(
  'generate-scroll-code',
  {
    language: z.enum(['javascript', 'java']),
    direction: z.enum(['up', 'down', 'left', 'right']),
    useElement: z.boolean().default(false),
    elementId: z.string().optional(),
    distance: z.number().default(300),
  },
  async ({ language, direction, useElement, elementId, distance }) => {
    let code = '';
    let startX, startY, endX, endY;

    // Set coordinates based on direction
    switch (direction) {
      case 'up':
        startX = 200;
        startY = 200;
        endX = 200;
        endY = startY + distance;
        break;
      case 'down':
        startX = 200;
        startY = 500;
        endX = 200;
        endY = startY - distance;
        break;
      case 'left':
        startX = 300;
        startY = 300;
        endX = startX + distance;
        endY = 300;
        break;
      case 'right':
        startX = 500;
        startY = 300;
        endX = startX - distance;
        endY = 300;
        break;
    }

    if (language === 'javascript') {
      if (useElement && elementId) {
        code = `// For WebdriverIO v9+ and below
await $('~${elementId}').scrollIntoView();`;
      } else {
        code = `// For WebdriverIO v9+
await browser.swipe({
  direction: '${direction}',
  duration: 1500,
  percent: 0.8
});

// For WebdriverIO below v9
// Option 1: Using touchAction
await driver.touchAction([
  { action: 'press', x: ${startX}, y: ${startY} },
  { action: 'wait', ms: 500 },
  { action: 'moveTo', x: ${endX}, y: ${endY} },
  { action: 'release' }
]);

// Option 2: Using Gestures helper class
class Gestures {
  static async checkIfDisplayedWithSwipe({
    scrollContainer,
    searchableElement,
    maxScrolls = 5,
    direction = '${direction}'
  }) {
    // Get container dimensions
    const { x, y, width, height } = await driver.getElementRect(scrollContainer.elementId);
    
    // Calculate scroll coordinates based on direction
    const from = { x: 0, y: 0 };
    const to = { x: 0, y: 0 };
    
    switch(direction) {
      case 'up':
        from.x = x + width / 2;
        from.y = y + height * 0.8;
        to.x = x + width / 2;
        to.y = y + height * 0.2;
        break;
      case 'down':
        from.x = x + width / 2;
        from.y = y + height * 0.2;
        to.x = x + width / 2;
        to.y = y + height * 0.8;
        break;
      case 'left':
        from.x = x + width * 0.8;
        from.y = y + height / 2;
        to.x = x + width * 0.2;
        to.y = y + height / 2;
        break;
      case 'right':
        from.x = x + width * 0.2;
        from.y = y + height / 2;
        to.x = x + width * 0.8;
        to.y = y + height / 2;
        break;
    }
    
    // Execute gesture
    await driver
      .action('pointer')
      .move(from.x, from.y)
      .down()
      .pause(100)
      .move({ duration: 1000, x: to.x, y: to.y })
      .up()
      .perform();
  }
}

// Example usage
const scrollContainer = $('~scrollView');
await Gestures.checkIfDisplayedWithSwipe({
  scrollContainer,
  searchableElement: $('~targetElement'),
  direction: '${direction}'
});`;
      }
    } else if (language === 'java') {
      if (useElement && elementId && direction === 'down') {
        code = `// Using Android UIAutomator
driver.findElement(AppiumBy.androidUIAutomator(
  "new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView("
  + "new UiSelector().text(\\"${elementId}\\"))"));`;
      } else {
        code = `// Using W3C Actions API (recommended)
WebElement scrollView = driver.findElement(AppiumBy.accessibilityId("scrollView"));
Point source = scrollView.getLocation();
Dimension size = scrollView.getSize();

// Create a finger gesture with touch pointer
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence sequence = new Sequence(finger, 1);

// Calculate scroll coordinates based on direction
int fromX = ${startX};
int fromY = ${startY};
int toX = ${endX};
int toY = ${endY};

// Press, move and release
sequence.addAction(finger.createPointerMove(Duration.ofMillis(0),
        PointerInput.Origin.viewport(), fromX, fromY));
sequence.addAction(finger.createPointerDown(PointerInput.MouseButton.MIDDLE.asArg()));
sequence.addAction(finger.createPointerMove(Duration.ofMillis(600),
        PointerInput.Origin.viewport(), toX, toY));
sequence.addAction(finger.createPointerUp(PointerInput.MouseButton.MIDDLE.asArg()));

// Perform the action
driver.perform(Collections.singletonList(sequence));`;
      }
    }

    return {
      content: [{ type: 'text', text: code }],
    };
  }
);

// Tool to generate long press gesture code
server.tool(
  'generate-long-press-code',
  {
    language: z.enum(['javascript', 'java']),
    useElement: z.boolean(),
    elementId: z.string().optional(),
    x: z.number().optional(),
    y: z.number().optional(),
    duration: z.number().default(2000),
  },
  async ({ language, useElement, elementId, x, y, duration }) => {
    let code = '';

    if (useElement && !elementId) {
      return {
        content: [
          {
            type: 'text',
            text: 'Error: elementId is required when useElement is true',
          },
        ],
        isError: true,
      };
    }

    if (!useElement && (x === undefined || y === undefined)) {
      return {
        content: [
          {
            type: 'text',
            text: 'Error: x and y coordinates are required when useElement is false',
          },
        ],
        isError: true,
      };
    }

    if (language === 'javascript') {
      if (useElement) {
        code = `// For WebdriverIO v9+
const element = $('~${elementId}');
await element.longPress({ duration: ${duration} });

// For WebdriverIO below v9
await $('~${elementId}').touchAction('longPress');`;
      } else {
        code = `// For WebdriverIO v9+
await browser.touchAction({ x: ${x}, y: ${y}, duration: ${duration} });

// For WebdriverIO below v9
await driver.touchAction([
  { action: 'longPress', x: ${x}, y: ${y}, ms: ${duration} },
  { action: 'release' }
]);`;
      }
    } else if (language === 'java') {
      if (useElement) {
        code = `// Using W3C Actions API (recommended)
WebElement element = driver.findElement(AppiumBy.accessibilityId("${elementId}"));
Point source = element.getLocation();
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence sequence = new Sequence(finger, 1);

// Move to element, press down, wait, then release
sequence.addAction(finger.createPointerMove(Duration.ofMillis(0),
        PointerInput.Origin.viewport(), source.x, source.y));
sequence.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
// Hold for ${duration} milliseconds
sequence.addAction(new Pause(finger, Duration.ofMillis(${duration})));
sequence.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));

// Perform the action
driver.perform(Collections.singletonList(sequence));`;
      } else {
        code = `// Using W3C Actions API (recommended)
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence sequence = new Sequence(finger, 1);

sequence.addAction(finger.createPointerMove(Duration.ofMillis(0),
        PointerInput.Origin.viewport(), ${x}, ${y}));
sequence.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
// Hold for ${duration} milliseconds
sequence.addAction(new Pause(finger, Duration.ofMillis(${duration})));
sequence.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));

// Perform the action
driver.perform(Collections.singletonList(sequence));`;
      }
    }

    return {
      content: [{ type: 'text', text: code }],
    };
  }
);

// Tool to generate double tap gesture code
server.tool(
  'generate-double-tap-code',
  {
    language: z.enum(['javascript', 'java']),
    useElement: z.boolean(),
    elementId: z.string().optional(),
    x: z.number().optional(),
    y: z.number().optional(),
    pauseDuration: z.number().default(200),
  },
  async ({ language, useElement, elementId, x, y, pauseDuration }) => {
    let code = '';

    if (useElement && !elementId) {
      return {
        content: [
          {
            type: 'text',
            text: 'Error: elementId is required when useElement is true',
          },
        ],
        isError: true,
      };
    }

    if (!useElement && (x === undefined || y === undefined)) {
      return {
        content: [
          {
            type: 'text',
            text: 'Error: x and y coordinates are required when useElement is false',
          },
        ],
        isError: true,
      };
    }

    if (language === 'javascript') {
      if (useElement) {
        code = `// For WebdriverIO v9+
const element = $('~${elementId}');
await element.doubleClick();

// For WebdriverIO below v9
// Using the Gestures helper class
const element = $('~${elementId}');
const { x, y } = await element.getLocation();
const centerX = x + (await element.getSize()).width / 2;
const centerY = y + (await element.getSize()).height / 2;

await driver
  .action('pointer')
  .move(centerX, centerY)
  .down()
  .up()
  .pause(${pauseDuration})
  .down()
  .up()
  .perform();`;
      } else {
        code = `// For WebdriverIO v9+
// No direct method for coordinates in v9+, use action API

// For WebdriverIO below v9
// Option 1: Using touchAction
await driver.touchAction([
  { action: 'tap', x: ${x}, y: ${y} },
  { action: 'wait', ms: ${pauseDuration} },
  { action: 'tap', x: ${x}, y: ${y} }
]);

// Option 2: Using action API
await driver
  .action('pointer')
  .move(${x}, ${y})
  .down()
  .up()
  .pause(${pauseDuration})
  .down()
  .up()
  .perform();`;
      }
    } else if (language === 'java') {
      if (useElement) {
        code = `WebElement element = driver.findElement(AppiumBy.accessibilityId("${elementId}"));
Point source = element.getLocation();
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence tap = new Sequence(finger, 1);

// First tap
tap.addAction(finger.createPointerMove(Duration.ofMillis(0),
        PointerInput.Origin.viewport(), source.x, source.y));
tap.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
tap.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));

// Small pause between taps
tap.addAction(new Pause(finger, Duration.ofMillis(${pauseDuration})));

// Second tap
tap.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
tap.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));

// Perform the action
driver.perform(Collections.singletonList(tap));`;
      } else {
        code = `PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence tap = new Sequence(finger, 1);

// First tap
tap.addAction(finger.createPointerMove(Duration.ofMillis(0),
        PointerInput.Origin.viewport(), ${x}, ${y}));
tap.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
tap.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));

// Small pause between taps
tap.addAction(new Pause(finger, Duration.ofMillis(${pauseDuration})));

// Second tap
tap.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
tap.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));

// Perform the action
driver.perform(Collections.singletonList(tap));`;
      }
    }

    return {
      content: [{ type: 'text', text: code }],
    };
  }
);

// Export the server
export default server;
