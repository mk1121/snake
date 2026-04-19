# How to Run Snake Xenzia on Windows

Follow these steps to set up and run the application on a Windows machine.

## Prerequisites

1.  **Node.js:** Download and install the latest LTS version from [nodejs.org](https://nodejs.org/).
2.  **Git:** (Optional) Install Git for Windows from [git-scm.com](https://git-scm.com/).
3.  **Android Studio:** (For Emulator) Download and install from [developer.android.com](https://developer.android.com/studio).
    -   During setup, ensure you install "Android SDK", "Android SDK Platform", and "Android Virtual Device".
4.  **Expo Go App:** (For physical device) Install the "Expo Go" app from the Google Play Store on your Android phone.

## Setup Instructions

### 1. Project Setup
Open PowerShell or Command Prompt and navigate to the project directory:
```bash
cd path\to\snake
```

### 2. Install Dependencies
Run the following command to install the required Node modules:
```bash
npm install
```

### 3. Start the Development Server
Launch the Expo development server:
```bash
npx expo start
```

## Running the App

### Option A: Using a Physical Android Device (Recommended)
1.  Ensure your phone and computer are on the same Wi-Fi network.
2.  Open the **Expo Go** app on your phone.
3.  Use the "Scan QR Code" feature in Expo Go to scan the QR code displayed in your terminal.
4.  The app will bundle and open on your device.

### Option B: Using an Android Emulator
1.  Open **Android Studio** and launch a virtual device via the **Device Manager**.
2.  In the terminal where `npx expo start` is running, press `a` to open the app on the emulator.

### Option C: Running in Web Browser
1.  In the terminal, press `w` to open the web version.
2.  *Note: While functional, the game is optimized for mobile aspect ratios.*

## Troubleshooting
- **Network Issues:** If the QR code doesn't work, try running `npx expo start --tunnel` (requires global installation of `expo-cli`).
- **Missing Modules:** If you encounter errors about missing packages, delete `node_modules` and run `npm install` again.
