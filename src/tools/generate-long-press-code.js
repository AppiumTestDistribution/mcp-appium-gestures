/**
 * Tool to generate long press gesture code
 */
import { z } from 'zod';

export default function generateLongPressCode(server) {
  server.addTool({
    name: 'generate-long-press-code',
    description: 'Generate code for long press gesture in Appium',
    parameters: z.object({
      language: z.enum(['javascript', 'java']),
      useElement: z.boolean(),
      elementId: z.string().optional(),
      x: z.number().optional(),
      y: z.number().optional(),
      duration: z.number().default(2000),
    }),
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
    },
    execute: async ({ language, useElement, elementId, x, y, duration }) => {
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

      return code;
    },
  });
}