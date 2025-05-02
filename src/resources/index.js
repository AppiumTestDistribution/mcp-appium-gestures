// Export all resources
import tapGesture from './tap-gesture.js';
import swipeGesture from './swipe-gesture.js';
import scrollGesture from './scroll-gesture.js';
import pinchZoomGesture from './pinch-zoom-gesture.js';
import longPressGesture from './long-press-gesture.js';
import dragDropGesture from './drag-drop-gesture.js';
import doubleTapGesture from './double-tap-gesture.js';
import gestureByName from './gesture-by-name.js';

export default function registerResources(server) {
  // Register all resources
  tapGesture(server);
  swipeGesture(server);
  scrollGesture(server);
  pinchZoomGesture(server);
  longPressGesture(server);
  dragDropGesture(server);
  doubleTapGesture(server);
  gestureByName(server);
}