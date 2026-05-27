let errors = [];

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'NEW_ERROR') {
    errors.push(msg.error);
    chrome.action.setBadgeText({ text: String(errors.length), tabId: sender.tab?.id });
    chrome.action.setBadgeBackgroundColor({ color: '#7c3aed' });
  }
  if (msg.type === 'GET_ERRORS') {
    sendResponse(errors);
    return true;
  }
  if (msg.type === 'CLEAR_ERRORS') {
    errors = [];
    chrome.action.setBadgeText({ text: '' });
  }
});

// Reset on tab navigation
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading') {
    errors = [];
    chrome.action.setBadgeText({ text: '', tabId });
  }
});
