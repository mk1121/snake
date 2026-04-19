# Snake Xenzia - Multi-platform Retro Game

A faithful recreation of the classic Snake Xenzia game, built with React Native and Expo. Experience the nostalgia on Android and Web with modern features like global highscores and haptic feedback.

## 🚀 Live Demo
[https://snake.maruf.com.bd](https://snake.maruf.com.bd)

## 📱 Screenshots
<p align="center">
  <img src="https://snake.maruf.com.bd/assets/ss1.png" width="250" alt="Main Game View">
  <img src="https://snake.maruf.com.bd/assets/ss2.png" width="250" alt="Settings & Scoreboard">
  <img src="https://snake.maruf.com.bd/assets/ss3.png" width="250" alt="Game Over State">
</p>

## ✨ Features
- **Classic Gameplay:** Faithful recreation of the original Snake Xenzia logic.
- **Global Highscores:** Compete with players worldwide via the MongoDB-backed Express.js backend.
- **Multi-platform:** Play on Android, iOS, or Web with a responsive layout.
- **Adaptive Difficulty:** 10 difficulty levels with automatic level-up every 5 points.
- **Modern Controls:** Tactile D-pad with customizable hitSlop and full Arrow Key support on PC.
- **Haptic Feedback:** Physical tactile response for movements, scores, and game over.
- **Offline First:** Local highscore caching and background synchronization when the server is down.

## 🛠 Tech Stack
- **Frontend:** React Native, Expo, AsyncStorage, Haptics.
- **Backend:** Node.js, Express.js, Mongoose (MongoDB).
- **Deployment:** Docker (Backend & Web), Coolify.

## 📦 Running Locally

### Prerequisites
- Node.js (LTS)
- Expo Go (for mobile)
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/mk1121/snake.git
   cd snake
   ```
2. Install dependencies:
   ```bash
   npm install
   cd server && npm install && cd ..
   ```
3. Set up environment variables:
   Create a `.env` in the root and `server/.env` based on the project instructions.

4. Start the project:
   - **Backend:** `cd server && node index.js`
   - **Frontend:** `npx expo start`

## 📄 Documentation
- [Project Proposal](PROPOSAL.md)
- [Technical Report](REPORT.md)
- [GitHub Release Guide](GITHUB_RELEASE_GUIDE.md)
- [Windows Setup Guide](WINDOWS_SETUP.md)

## 📜 License
MIT License.
