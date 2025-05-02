/**
 * Tool to generate double tap gesture code
 */
import { z } from 'zod';

export default function generateDoubleTapCode(server) {
  server.addTool({
    name: 'generate-double-tap-code',
    description: 'Generate code for double tap gesture in Appium',
    parameters: z.object({
      language: z.enum(['javascript', 'java']),
      useElement: z.boolean(),
      elementId: z.string().optional(),
      x: z.number().optional(),
      y: z.number().optional(),
      pauseDuration: z.number().default(200),
    }),
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
    },
    execute: async ({ language, useElement, elementId, x, y, pauseDuration }) => {
      let code = '';

      if (useElement && !elementId) {
        throw new Error('elementId is required when useElement is true');
      }

      if (!useElement && (x === undefined || y === undefined)) {
        throw new Error('x and y coordinates are required when useElement is false');
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

      return code;
    },
  });
}
