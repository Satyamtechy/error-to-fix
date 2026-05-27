const ERROR_DATABASE = [
  {
    pattern: "Cannot read properties of undefined",
    title: "Cannot read properties of undefined",
    fix: "Add a null/undefined check before accessing the property. Use optional chaining (?.) or check if the object exists before accessing nested properties.",
    example: "obj?.property or if (obj) { obj.property }"
  },
  {
    pattern: "Cannot read properties of null",
    title: "Cannot read properties of null",
    fix: "The variable is null. Check that the element exists (e.g., document.querySelector returned null) or that an API response has data before accessing properties.",
    example: "const el = document.querySelector('#id'); if (el) { el.textContent = '...'; }"
  },
  {
    pattern: "is not a function",
    title: "TypeError: X is not a function",
    fix: "The value you're trying to call is not a function. Check for typos in the method name, ensure the import is correct, or verify the object has that method.",
    example: "Check typeof value === 'function' before calling"
  },
  {
    pattern: "Failed to fetch",
    title: "Failed to fetch (Network Error)",
    fix: "The network request failed. Check: 1) The URL is correct, 2) The server is running, 3) CORS headers are set, 4) No ad blocker is interfering.",
    example: "try { await fetch(url) } catch(e) { /* handle offline/network error */ }"
  },
  {
    pattern: "CORS",
    title: "CORS Error",
    fix: "The server needs to include Access-Control-Allow-Origin header. For development, use a proxy or set the header on your backend. Never disable CORS in production.",
    example: "Backend: res.setHeader('Access-Control-Allow-Origin', 'https://yourdomain.com')"
  },
  {
    pattern: "404",
    title: "404 Not Found",
    fix: "The requested resource doesn't exist. Check the URL path, ensure the file/endpoint exists, and verify any dynamic route parameters.",
    example: "Verify URL spelling and that the API endpoint is deployed"
  },
  {
    pattern: "401",
    title: "401 Unauthorized",
    fix: "Authentication required. Ensure you're sending a valid auth token/cookie. The token may have expired — try refreshing it.",
    example: "fetch(url, { headers: { Authorization: 'Bearer ' + token } })"
  },
  {
    pattern: "403",
    title: "403 Forbidden",
    fix: "You're authenticated but don't have permission. Check user roles/permissions on the backend for this endpoint.",
    example: "Verify the user's role has access to the requested resource"
  },
  {
    pattern: "500",
    title: "500 Internal Server Error",
    fix: "Server-side error. Check backend logs for the stack trace. Common causes: unhandled exceptions, database connection issues, missing environment variables.",
    example: "Check server logs: docker logs <container> or check your hosting provider's log viewer"
  },
  {
    pattern: "SyntaxError: Unexpected token",
    title: "SyntaxError: Unexpected token",
    fix: "Invalid JSON or JavaScript syntax. If parsing JSON, ensure the response is actually JSON (not HTML error page). If JS, check for missing brackets/commas.",
    example: "try { JSON.parse(text) } catch { /* response wasn't JSON */ }"
  },
  {
    pattern: "Maximum call stack size exceeded",
    title: "Maximum call stack size exceeded (Infinite recursion)",
    fix: "A function is calling itself infinitely. Check for recursive calls without proper base cases, or circular references in data structures.",
    example: "Add a base case: if (depth > MAX) return;"
  },
  {
    pattern: "ResizeObserver loop",
    title: "ResizeObserver loop limit exceeded",
    fix: "Usually harmless. An element's size changed during the ResizeObserver callback, triggering another observation. You can safely ignore this or debounce the callback.",
    example: "window.addEventListener('error', e => { if (e.message.includes('ResizeObserver')) e.stopPropagation(); })"
  },
  {
    pattern: "net::ERR_CONNECTION_REFUSED",
    title: "Connection Refused",
    fix: "The server isn't running or isn't listening on that port. Start your dev server, check the port number, or verify the service is deployed.",
    example: "Ensure: npm start / docker-compose up is running"
  },
  {
    pattern: "ChunkLoadError",
    title: "ChunkLoadError (Lazy loading failed)",
    fix: "A code-split chunk failed to load. Usually caused by a new deployment while users have an old version cached. Implement a reload strategy on chunk load failure.",
    example: "window.location.reload() on ChunkLoadError, or use service worker for caching"
  },
  {
    pattern: "SecurityError",
    title: "SecurityError",
    fix: "A browser security policy was violated. Common causes: accessing cross-origin iframes, using localStorage in private mode, or mixed content (HTTP on HTTPS page).",
    example: "Ensure all resources are loaded over HTTPS and same-origin policies are respected"
  },
  {
    pattern: "QuotaExceededError",
    title: "QuotaExceededError (Storage full)",
    fix: "localStorage/sessionStorage is full (~5MB limit). Clear old data or use IndexedDB for larger storage needs.",
    example: "try { localStorage.setItem(k, v) } catch { /* clear old items */ }"
  }
];
