<div align="Center">
    <span style="font-size:25px;font-weight:bold;" >Material Homepage</h1>
    <br/>
    <span style="font-size:16px;font-weight:bold">By MrSIHAB</span>

[![Support me on Patreon](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3DShoaibHossain%26type%3Dpatrons%26suffix%3Dmembers&style=social)](https://www.patreon.com/ShoaibHossain)

---

[![BMC](https://img.buymeacoffee.com/button-api/?text=&slug=mrsihab&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=FFFFFF)](https://bit.ly/m/MrSIHAB)

  <!-- Firefox addon link -->
  <a href="https://addons.mozilla.org/en-US/firefox/addon/material-hompage/">
    <img src="https://github.com/user-attachments/assets/c0e99e6b-97cf-4af2-9737-099db7d3538b" alt="Firefox addon" height="50" />
  </a>
  <!-- Edge addon link English -->
  <a href="https://microsoftedge.microsoft.com/addons/detail/material-hompage/gppedgcpmlnfphgohlcdmeejokcgipjb">
    <img src="screenshots/getitEdgeEnglish.png" alt="edge addon" height="50" />
  </a>
  <!-- Edge addon link Bangla -->
  <a href="https://microsoftedge.microsoft.com/addons/detail/material-hompage/gppedgcpmlnfphgohlcdmeejokcgipjb">
    <img src="screenshots/getItEdgeBangla.png" alt="edge addon" height="50" />
  </a>
</div>

**The most productive browser Homepage/NewTab**

[🔗 Preview Extension](https://mrsihab.github.io/material-homepage)

## Introduction

**Material Homepage**, aka **Vist** is a browser extension featuring productivity, minimalist and distraction-free dashboard. Initially I developed it as a dummy project for learning purpose. Then I worked on it any made it usable for myself. And it become a personal project.  
Later on, I made it public. Initially I launched the first version to Mozilla Firefox and Microsoft edge. I wanted to launch it to chrome Web Store too. But it failed for insufficient resources. Chrome Web Store require a one time $5 payment with a mastercard and probably user verification with that mastercard. It doesn't support any other payment method available in Bangladesh. So, I had to create a bank account, make a passport, apply for dual currency with that passport and get a mastercard from bank and make that $5 payment. Which was much costly and time consuming process for me depending on my situations. So, I delayed it for later. But there is another way to install it on chrome. See the [Installation](#installation) process. Over the time I tried to improve it step by step. Since it is/was my primary chrome extension since then, I over the time directly feel the required features and improvements and added them to it. And it was a matter of joy that we reached 1.5k+ users without any promotion and affiliates.  

After a long time(2 years), I found that the extension need a huge upgrade which wasn't possible as addition to the extension rather than replacing the extension and while doing that, my current codebase which was a single JS file, became so messy. So, it was time to make it Ronaldo. Firstly, I made the codebase modular and made the codebase more meaningful so that other contributors can easily contribute. Although there wasn't/isn't any direct contributors till now. I redesigned everything replacing so many parts, features, color palates. It was more like a rewrite in a better way. I spend 2 weeks and launched the version 2. Which can be expressed by one line `Brand new Material Homepage`. You can follow the changelog to see what have changed. There is a last version one release in the github. You can still download and experience version 1 (discontinued).

In version two, I have added a simple developer credit with my patreon account. Where you can show your support for me and my work.

_Upon installation, Material Homepage replaces your default New Tab with a customizable dashboard that offers quick access to frequently used websites, applications, and search functionalities. The design emphasizes simplicity and usability, creating a professional yet inviting space._

## Key Features:

- Modern, clean, and visually appealing design
- Distraction-free user interface for enhanced focus
- Multiple Search Engine support
- Dynamic theme with color palettes
- Automatic light and dark mode based on the selected color
- User-defined shortcut sites for easy access
- Backup and restore settings locally.
- 100% privacy proof.
- Default shortcuts for popular websites, including AI tools, social media, development resources, Google, and Microsoft services.

## ScreenShots
<div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:1rem;">
  <img src="./screenshots/classic.png" />
  <img src="./screenshots/black-accent.png" />
  <img src="./screenshots/quick-sites.png" />
  <img src="./screenshots/dark.png" />
</div>

# Installation

Material Homepage supports almost every popular browsers including Chrome, Edge, Firefox, Brave and probably the one you are using right now. Follow instruction below to enjoy Material Homepage in your browser.

### Mozilla Firefox:

Material Homepage is available in Firefox addon store. You can simply download and install from there.

- Go to [Firefox-addon/material-homepage](https://addons.mozilla.org/en-US/firefox/addon/material-hompage/)
- Install it
- If you see any banner at top or bottom, you can right click on that and disable that.

### Microsoft EDGE:

Material Homepage is also available in Microsoft Edge web-store.

- Visit [Edge-addons/material-homepage](https://microsoftedge.microsoft.com/addons/detail/material-hompage/gppedgcpmlnfphgohlcdmeejokcgipjb)
- Click on `GET` and install the extension.
- Open extension manager: `chrome://extensions`
- Turn on Material-Homepage.
- If you see any banner at top or bottom, you can right click on that and disable that.

### Chrome, Brave, Opera and other chromium browsers

Material Homepage isn't available for On Chrome web-store yet. So, you can't access Material Homepage directly on chromium browsers. But you can install Material Homepage a dev extension.

- Download the [latest release](https://github.com/mrsihab/material-homepage/releases) of Material Homepage.
- Extract and move the folder to a secure location. Ex: `$USER/ext/`
- Don't delete any files or folder even after installation.
- Open your browser's extension manager page. `chrome://extensions/`
- Find out developer mode and enable that.
- There should be a **load unpacked** option unlocked.
- Click **Load unpacked** button and locate to the file where you stored material homepage.
- Try to select **manifest.json** file or the parent file. `$USER/ext/material-homepage/manifest.json`
- Turn on the extension if it is off.
- If any banner at top or bottom disturbing you, right click on that and disable that.

![chrome](/screenshots/chrome.png)

Congratulations. Your extension has been installed successfully. Enjoy your extension.

### Git installation:
If you know git, it would be one of the best choice for you.

- Verify if git is installed on you machine.

  ```bash
  git --version
  ```
- Clone the Material Homepage repository in a secure folder.
  ```bash
  # Creating a ext folder to hold the package and moving there 
  mkdir -p ~/ext
  cd ~/ext
  
  # Clone the repository
  git clone https://github.com/mrsihab/material-homepage.git
  ```
- Open your browser's extension manager page. `chrome://extensions/`
- Find out developer mode and enable that.
- There should be a **load unpacked** option unlocked.
- Click **Load unpacked** button and locate to the file where you stored material homepage.
- Try to select **manifest.json** file or the parent file. `$USER/ext/material-homepage/manifest.json`
- Turn on the extension if it is off.
- If any banner at top or bottom disturbing you, right click on that and disable that.

![Installation Instruction IMG](/screenshots/chrome.png)

Congratulations. Your extension has been installed successfully.

_Update the extension anytime you want:_
```bash
cd ~/material-homepage
git pull
```

## Privacy:

_No personal data is being collected. All preferences are stored locally._
