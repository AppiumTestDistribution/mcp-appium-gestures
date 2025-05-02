/**
 * Resource for long press gesture documentation
 */
export default function longPressGesture(server) {
  server.addResource({
    uri: 'gesture://long-press',
    name: 'Long Press Gesture',
    mimeType: 'text/markdown',
    async load() {
      return {
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
      };
    },
  });
}