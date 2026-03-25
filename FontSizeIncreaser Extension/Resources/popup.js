// popup.js — Slider logic and communication with background/content scripts

const slider = document.getElementById("fontSlider");
const currentValue = document.getElementById("currentValue");
const siteLabel = document.getElementById("siteLabel");
const resetBtn = document.getElementById("resetBtn");

let activeHostname = null;
let activeTabId = null;

// Initialize: get the active tab's hostname and load its stored font size
browser.runtime.sendMessage({ type: "getActiveTabHostname" }, (response) => {
  if (response && response.hostname) {
    activeHostname = response.hostname;
    activeTabId = response.tabId;
    siteLabel.textContent = activeHostname;

    // Load stored value for this site
    browser.runtime.sendMessage(
      { type: "getFontSize", hostname: activeHostname },
      (res) => {
        if (res && res.fontSize) {
          slider.value = res.fontSize;
          currentValue.textContent = res.fontSize + "%";
        }
      }
    );
  } else {
    siteLabel.textContent = "No active page";
    slider.disabled = true;
  }
});

function handleSliderChange(value) {
  currentValue.textContent = value + "%";
  browser.tabs.sendMessage(activeTabId, { type: "applyFontSize", fontSize: value });
  browser.runtime.sendMessage({ type: "saveFontSize", hostname: activeHostname, fontSize: value });
}

slider.addEventListener("input", (e) => {
  handleSliderChange(Number(e.target.value));
});

resetBtn.addEventListener("click", () => {
  handleSliderChange(100);
  slider.value = 100;
});
