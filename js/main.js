// Entry point: boot the app once the DOM is parsed.
import { StardewWikiApp } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = new StardewWikiApp();
  app.init();
  window.app = app;
});
