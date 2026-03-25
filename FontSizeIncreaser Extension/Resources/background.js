// background.js — Coordinates storage and messaging between popup and content scripts

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getFontSize") {
    const key = "fontSize_" + message.hostname;
    browser.storage.local.get(key, (result) => {
      sendResponse({ fontSize: result[key] || 100 });
    });
    return true; // async response
  }

  if (message.type === "saveFontSize") {
    const key = "fontSize_" + message.hostname;
    browser.storage.local.set({ [key]: message.fontSize });
  }

  if (message.type === "getActiveTabHostname") {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        try {
          const url = new URL(tabs[0].url);
          sendResponse({ hostname: url.hostname, tabId: tabs[0].id });
        } catch (e) {
          sendResponse({ hostname: null, tabId: null });
        }
      } else {
        sendResponse({ hostname: null, tabId: null });
      }
    });
    return true; // async response
  }
});
