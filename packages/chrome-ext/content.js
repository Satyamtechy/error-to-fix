// Inject a script to intercept console.error in the page context
const script = document.createElement('script');
script.textContent = `
  (function() {
    const originalError = console.error;
    console.error = function(...args) {
      const message = args.map(a => typeof a === 'string' ? a : JSON.stringify(a)).join(' ');
      window.postMessage({ type: 'ERROR_TO_FIX', error: message }, '*');
      originalError.apply(console, args);
    };
  })();
`;
(document.head || document.documentElement).appendChild(script);
script.remove();

// Listen for errors from the page and forward to background
window.addEventListener('message', (event) => {
  if (event.source !== window || event.data?.type !== 'ERROR_TO_FIX') return;
  chrome.runtime.sendMessage({ type: 'NEW_ERROR', error: event.data.error });
});
