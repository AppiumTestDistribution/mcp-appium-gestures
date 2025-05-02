/**
 * Tool to generate scroll gesture code
 */
import { z } from 'zod';

export default function generateScrollCode(server) {
  server.addTool({
    name: 'generate-scroll-code',
    description: 'Generate code for scroll gesture in Appium',
    parameters: z.object({
      language: z.enum(['javascript', 'java']),
      direction: z.enum(['up', 'down', 'left', 'right']),
      useElement: z.boolean().default(false),
      elementId: z.string().optional(),
      distance: z.number().default(300),
    }),
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
    },
    execute: async ({ language, direction, useElement, elementId, distance }) => {
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

      return code;
    },
  });
}