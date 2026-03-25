# Font Size Increaser — Safari Extension

A Safari Web Extension that lets you increase font size (100%–200%) on any website using a simple slider. Remembers your preference per site.

![icon](FontSizeIncreaser%20Extension/Resources/icon-128.png)

## Features

- **Slider control** — drag to adjust font size from 100% to 200%
- **Per-site memory** — your preference is saved and restored automatically for each website
- **Reset button** — one click to go back to 100%
- **Uniform scaling** — scales all text proportionally, preserving heading/body hierarchy

## Installation

### Prerequisites
- macOS 10.14+
- Xcode 14+
- Safari 16+

### Build & Install

1. Clone the repo:
   ```bash
   git clone https://github.com/narennaik/FontSizeIncreaser.git
   cd FontSizeIncreaser
   ```

2. Open in Xcode:
   ```bash
   open FontSizeIncreaser.xcodeproj
   ```

3. Select your development team under **Signing & Capabilities** for both targets:
   - `FontSizeIncreaser`
   - `FontSizeIncreaser Extension`

4. Build and run (Cmd+R).

5. Enable in Safari:
   - Open **Safari** → **Settings** (Cmd+,) → **Advanced**
   - Check **"Show features for web developers"**
   - Go to **Develop** menu → **Allow Unsigned Extensions** (enter password)
   - Go to **Safari** → **Settings** → **Extensions**
   - Check the box next to **Font Size Increaser**

### Usage

Click the extension icon in Safari's toolbar on any webpage. Drag the slider to adjust font size. Your setting is saved automatically for that site.

## How It Works

- **content.js** — injected into every page, sets `document.documentElement.style.fontSize` to the stored percentage
- **background.js** — manages per-site storage and message passing
- **popup.js/html/css** — the slider UI shown when you click the toolbar icon

## License

MIT
