/**
 * Resource for swipe gesture documentation
 */
export default function swipeGesture(server) {
  server.addResource({
    uri: 'gesture://swipe',
    name: 'Swipe Gesture',
    mimeType: 'text/markdown',
    async load() {
      return {
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
      };
    },
  });
}