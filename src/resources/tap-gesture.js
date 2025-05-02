/**
 * Resource for tap gesture documentation
 */
export default function tapGesture(server) {
  server.addResource({
    uri: 'gesture://tap',
    name: 'Tap Gesture',
    mimeType: 'text/markdown',
    async load() {
      return {
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
      };
    },
  });
}