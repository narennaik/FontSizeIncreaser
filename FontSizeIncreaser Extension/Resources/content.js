// content.js — Applies stored font-size percentage to the current page

(function () {
  const hostname = location.hostname;

  // Request stored font size for this site from background script
  browser.runtime.sendMessage({ type: "getFontSize", hostname }, (response) => {
    if (response && response.fontSize) {
      applyFontSize(response.fontSize);
    }
  });

  // Listen for live updates from the popup slider
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "applyFontSize") {
      applyFontSize(message.fontSize);
    }
  });

  function applyFontSize(percent) {
    document.documentElement.style.fontSize = percent + "%";
  }
})();
