/**
 * Resource for pinch/zoom gesture documentation
 */
export default function pinchZoomGesture(server) {
  server.addResource({
    uri: 'gesture://pinch-zoom',
    name: 'Pinch and Zoom Gestures',
    mimeType: 'text/markdown',
    async load() {
      return {
        text: `
# Pinch and Zoom Gestures in Appium

These gestures simulate pinching (zoom out) and zooming (zoom in) on the screen, commonly used for image manipulation.

## WebdriverIO Example (v9+)
\`\`\`javascript
// Pinch (zoom out) on an element
const mapsElement = $('//*[@resource-id="com.google.android.apps.maps:id/map_frame"]');
// Pinch with the default duration scale
await mapsElement.pinch();
// Pinch with a custom duration and scale
await mapsElement.pinch({ duration: 4000, scale: 0.9 });

// Zoom (zoom in) on an element
// Zoom with the default duration scale
await mapsElement.zoom();
// Zoom with a custom duration and scale
await mapsElement.zoom({ duration: 4000, scale: 0.9 });
\`\`\`

## WebdriverIO Example (below v9)
\`\`\`javascript
// For WebdriverIO below v9, touchAction is used for pinch/zoom
// Zoom in (spread)
await driver.touchAction([
  [
    { action: 'press', x: 150, y: 150 },
    { action: 'moveTo', x: 100, y: 100 },
    { action: 'release' }
  ],
  [
    { action: 'press', x: 150, y: 150 },
    { action: 'moveTo', x: 200, y: 200 },
    { action: 'release' }
  ]
]);

// Zoom out (pinch)
await driver.touchAction([
  [
    { action: 'press', x: 100, y: 100 },
    { action: 'moveTo', x: 150, y: 150 },
    { action: 'release' }
  ],
  [
    { action: 'press', x: 200, y: 200 },
    { action: 'moveTo', x: 150, y: 150 },
    { action: 'release' }
  ]
]);
\`\`\`

## Appium Java Client Example (W3C Actions API)
\`\`\`java
// Implementation from VodQaAdvancedAppium repository
@Test
public void pinchAndZoom() throws InterruptedException {
  // Setup
  login();
  Thread.sleep(5000);
  driver.findElement(AppiumBy.accessibilityId("photoView")).click();
  
  // Get the image element
  WebElement element = new WebDriverWait(driver, Duration.ofMillis(30))
          .until(elementToBeClickable(AppiumBy.accessibilityId("photo")));
  
  Point source = element.getLocation();
  PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
  
  // First finger - creates first sequence of actions
  Sequence pinchAndZoom1 = new Sequence(finger, 0);
  pinchAndZoom1.addAction(finger.createPointerMove(Duration.ofMillis(0),
          PointerInput.Origin.viewport(), source.x / 2, source.y / 2));
  pinchAndZoom1.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
  pinchAndZoom1.addAction(new Pause(finger, Duration.ofMillis(100)));
  pinchAndZoom1.addAction(finger.createPointerMove(Duration.ofMillis(600),
          PointerInput.Origin.viewport(), source.x / 3, source.y / 3));
  pinchAndZoom1.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));
  
  // Second finger - creates second sequence of actions
  PointerInput finger2 = new PointerInput(PointerInput.Kind.TOUCH, "finger2");
  Sequence pinchAndZoom2 = new Sequence(finger2, 0);
  pinchAndZoom2.addAction(finger2.createPointerMove(Duration.ofMillis(0),
          PointerInput.Origin.viewport(), source.x / 2, source.y / 2));
  pinchAndZoom2.addAction(finger2.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
  pinchAndZoom2.addAction(new Pause(finger, Duration.ofMillis(100)));
  pinchAndZoom2.addAction(finger2.createPointerMove(Duration.ofMillis(600),
          PointerInput.Origin.viewport(), source.x * 3 / 4, source.y * 3 / 4));
  pinchAndZoom2.addAction(finger2.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));
  
  // Perform both sequences
  driver.perform(Arrays.asList(pinchAndZoom1, pinchAndZoom2));
}
\`\`\`

The W3C Actions API is the recommended approach for complex gestures in Appium Java client as it provides more precise control over multi-touch interactions.
        `,
      };
    },
  });
}