// Export all tools
import generateTapCode from './generate-tap-code.js';
import generateSwipeCode from './generate-swipe-code.js';
import generateScrollCode from './generate-scroll-code.js';
import generateLongPressCode from './generate-long-press-code.js';
import generateDoubleTapCode from './generate-double-tap-code.js';

export default function registerTools(server) {
  // Register all tools
  generateTapCode(server);
  generateSwipeCode(server);
  generateScrollCode(server);
  generateLongPressCode(server);
  generateDoubleTapCode(server);
}