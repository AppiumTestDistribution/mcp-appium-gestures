/**
 * Tool to generate swipe gesture code
 */
import { z } from 'zod';

export default function generateSwipeCode(server) {
  server.addTool({
    name: 'generate-swipe-code',
    description: 'Generate code for swipe gesture in Appium',
    parameters: z.object({
      language: z.enum(['javascript', 'java']),
      startX: z.number(),
      startY: z.number(),
      endX: z.number(),
      endY: z.number(),
      duration: z.number().default(500),
    }),
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
    },
    execute: async ({ language, startX, startY, endX, endY, duration }) => {
      let code = '';

      if (language === 'javascript') {
        code = `// For WebdriverIO v9+
// Calculate direction based on coordinates
const direction = ${
          startX === endX
            ? startY > endY
              ? "'up'"
              : "'down'"
            : startX > endX
            ? "'left'"
            : "'right'"
        };

await browser.swipe({
  direction: ${
    startX === endX
      ? startY > endY
        ? "'up'"
        : "'down'"
      : startX > endX
      ? "'left'"
      : "'right'"
  },
  duration: ${duration}
});

// For WebdriverIO below v9
// Option 1: Using touchAction
await driver.touchAction([
  { action: 'press', x: ${startX}, y: ${startY} },
  { action: 'wait', ms: ${duration} },
  { action: 'moveTo', x: ${endX}, y: ${endY} },
  { action: 'release' }
]);

// Option 2: Using action API
await driver
  .action('pointer')
  .move(${startX}, ${startY})
  .down()
  .pause(100)
  .move({ duration: ${duration}, x: ${endX}, y: ${endY} })
  .up()
  .perform();`;
      } else if (language === 'java') {
        code = `// Using W3C Actions API (recommended)
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
Sequence sequence = new Sequence(finger, 1);

// Press, move and release
sequence.addAction(finger.createPointerMove(Duration.ofMillis(0),
        PointerInput.Origin.viewport(), ${startX}, ${startY}));
sequence.addAction(finger.createPointerDown(PointerInput.MouseButton.MIDDLE.asArg()));
sequence.addAction(finger.createPointerMove(Duration.ofMillis(${duration}),
        PointerInput.Origin.viewport(), ${endX}, ${endY}));
sequence.addAction(finger.createPointerUp(PointerInput.MouseButton.MIDDLE.asArg()));

// Perform the action
driver.perform(Collections.singletonList(sequence));`;
      }

      return code;
    },
  });
}