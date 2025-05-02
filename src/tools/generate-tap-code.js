/**
 * Tool to generate tap gesture code
 */
import { z } from 'zod';

export default function generateTapCode(server) {
  server.addTool({
    name: 'generate-tap-code',
    description: 'Generate code for tap gesture in Appium',
    parameters: z.object({
      language: z.enum(['javascript', 'java']),
      useElement: z.boolean(),
      elementId: z.string().optional(),
      x: z.number().optional(),
      y: z.number().optional(),
    }),
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
    },
    execute: async ({ language, useElement, elementId, x, y }) => {
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

      return code;
    },
  });
}