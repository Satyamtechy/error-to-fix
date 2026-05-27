const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');
const detectedDiv = document.getElementById('detected');

// Search database
function search(query) {
  if (!query.trim()) { resultsDiv.innerHTML = ''; return; }
  const q = query.toLowerCase();
  const matches = ERROR_DATABASE.filter(e => q.includes(e.pattern.toLowerCase()) || e.pattern.toLowerCase().includes(q));
  if (!matches.length) {
    resultsDiv.innerHTML = '<div class="no-results">No matching fix found. Try a different error message.</div>';
    return;
  }
  resultsDiv.innerHTML = matches.map(renderItem).join('');
}

function renderItem(item) {
  return `<div class="error-item">
    <div class="error-title">${item.title}</div>
    <div class="error-fix">${item.fix}</div>
    <div class="error-example">${item.example}</div>
  </div>`;
}

searchInput.addEventListener('input', () => search(searchInput.value));

// Load detected errors from background
chrome.runtime.sendMessage({ type: 'GET_ERRORS' }, (errors) => {
  if (!errors?.length) return;
  detectedDiv.innerHTML = `<div class="detected-header">Detected on this page (${errors.length})</div>` +
    errors.slice(0, 10).map(err => {
      const match = ERROR_DATABASE.find(e => err.toLowerCase().includes(e.pattern.toLowerCase()));
      return `<div class="error-item" data-error="${err.replace(/"/g, '&quot;')}">
        <div class="error-title">${err.length > 120 ? err.slice(0, 120) + '...' : err}</div>
        ${match ? `<div class="error-fix">${match.fix}</div><div class="error-example">${match.example}</div>` : '<div class="error-fix" style="color:#9ca3af">Click to search for a fix</div>'}
      </div>`;
    }).join('');

  detectedDiv.querySelectorAll('.error-item').forEach(el => {
    el.addEventListener('click', () => {
      searchInput.value = el.dataset.error;
      search(el.dataset.error);
    });
  });
});
