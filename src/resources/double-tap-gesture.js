/**
 * Resource for double tap gesture documentation
 */
export default function doubleTapGesture(server) {
  server.addResource({
    uri: 'gesture://double-tap',
    name: 'Double Tap Gesture',
    mimeType: 'text/markdown',
    async load() {
      return {
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
      };
    },
  });
}