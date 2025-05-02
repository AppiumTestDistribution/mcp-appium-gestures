/**
 * Dynamic resource for gesture documentation by name
 */
export default function gestureByName(server) {
  server.addResourceTemplate({
    uriTemplate: 'gesture://{name}',
    name: 'Gesture by Name',
    mimeType: 'text/markdown',
    arguments: [
      {
        name: 'name',
        description: 'Name of the gesture',
        required: true,
        enum: ['tap', 'swipe', 'scroll', 'pinch-zoom', 'long-press', 'drag-drop', 'double-tap'],
      },
    ],
    async load({ name }) {
      // Map of supported gestures
      const gestures = {
        tap: 'gesture://tap',
        swipe: 'gesture://swipe',
        scroll: 'gesture://scroll',
        'pinch-zoom': 'gesture://pinch-zoom',
        'long-press': 'gesture://long-press',
        'drag-drop': 'gesture://drag-drop',
        'double-tap': 'gesture://double-tap',
      };

      if (!gestures[name]) {
        return {
          text: `Gesture "${name}" not found. Available gestures: ${Object.keys(
            gestures
          ).join(', ')}`,
        };
      }

      // Redirect to the specific gesture resource
      return {
        text: `Redirecting to ${gestures[name]}...`,
      };
    },
  });
}