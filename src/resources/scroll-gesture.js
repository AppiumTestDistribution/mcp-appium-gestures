/**
 * Resource for scroll gesture documentation
 */
export default function scrollGesture(server) {
  server.addResource({
    uri: 'gesture://scroll',
    name: 'Scroll Gesture',
    mimeType: 'text/markdown',
    async load() {
      return {
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
  + "new UiSelector().text(\\"target text\\"))"));
\`\`\`
        `,
      };
    },
  });
}
