/**
 * Resource for drag and drop gesture documentation
 */
export default function dragDropGesture(server) {
  server.addResource({
    uri: 'gesture://drag-drop',
    name: 'Drag and Drop Gesture',
    mimeType: 'text/markdown',
    async load() {
      return {
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
      };
    },
  });
}