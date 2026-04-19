Since you provided the documentation and configuration for your **Snake Xenzia** project, I have tailored these 100 viva questions specifically to your implementation. I have divided them into categories to help you prepare systematically.

---

### Category 1: General Project Overview (Based on Proposal & Report)
**1. What is the primary objective of this project?**
*   **Answer:** To create a digital recreation of the retro Snake Xenzia game using modern mobile architecture.
*   **Reasoning:** The goal is to bridge the gap between legacy hardware logic and modern frameworks.

**2. Why did you choose the "Green LCD" visual paradigm?**
*   **Answer:** To maintain "Mechanical Fidelity" and retro aesthetic principles.
*   **Reasoning:** It replicates the original handheld device experience for the user.

**3. What are the three main functional requirements of your app?**
*   **Answer:** Navigation (directional input), Scoring (food consumption), and State Management (Active, Paused, Termination).
*   **Reasoning:** These are the core pillars required for a playable game loop.

**4. What does "Mechanical Fidelity" mean in your proposal?**
*   **Answer:** Implementing a deterministic engine that handles grid-based coordinates and collisions accurately.
*   **Reasoning:** Determinism ensures the game behaves consistently every time a move is made.

**5. What is the purpose of the "Variable Difficulty" system?**
*   **Answer:** To modulate speed across Levels I-X.
*   **Reasoning:** This allows for empirical testing of player reaction times and increases game challenge.

**6. Why is this project considered a "technical case study"?**
*   **Answer:** Because it demonstrates how modern JavaScript frameworks can replicate legacy hardware-bound logic.
*   **Reasoning:** It proves that modular design can solve old-school logic problems efficiently.

**7. What is the "Green LCD" color palette used in your project?**
*   **Answer:** Hex codes `#8bab3e` and `#98b64e`.
*   **Reasoning:** These colors mimic the low-contrast monochromatic screens of early Nokia phones.

**8. What are the three states of the game mentioned in your report?**
*   **Answer:** Active, Paused, and Termination.
*   **Reasoning:** A game must track whether it is running, stopped, or if the player has lost.

**9. How did you handle different screen dimensions?**
*   **Answer:** Using a flexbox-driven grid system.
*   **Reasoning:** Flexbox ensures the game remains responsive and maintains aspect ratio integrity across different Android devices.

**10. What is the "non-commenting policy" mentioned in your report?**
*   **Answer:** A policy where logic clarity is achieved through semantic naming rather than comments.
*   **Reasoning:** This encourages "self-documenting code," making the logic clear through the names of variables and functions.

---

### Category 2: Technical Stack (React Native & Expo)
**11. Why use React Native instead of Native Android (Java/Kotlin)?**
*   **Answer:** For cross-platform compatibility and faster development cycles.
*   **Reasoning:** React Native allows the app to potentially run on both iOS and Android with one codebase.

**12. What is the role of Expo in your project?**
*   **Answer:** It provides a set of tools and services that simplify the React Native development process.
*   **Reasoning:** Expo handles the bundling, provides a sandbox (Expo Go), and simplifies setup.

**13. What is the purpose of `app.json`?**
*   **Answer:** It contains the configuration for the Expo project (name, slug, version, orientation, etc.).
*   **Reasoning:** Expo uses this file to generate the app's manifest and build settings.

**14. Why is `orientation` set to "portrait" in `app.json`?**
*   **Answer:** Because the game is designed for a vertical mobile screen.
*   **Reasoning:** Locking orientation prevents UI breakage when the user rotates the phone.

**15. What does `newArchEnabled: true` signify in your config?**
*   **Answer:** It enables the new React Native architecture (Fabric/TurboModules).
*   **Reasoning:** The new architecture improves rendering performance and synchronization.

**16. What is the purpose of `package.json`?**
*   **Answer:** To manage project dependencies and define scripts.
*   **Reasoning:** It tells `npm` which libraries (like `react`, `expo`) are needed to run the app.

**17. What is the difference between `npm install` and `npx expo start`?**
*   **Answer:** `npm install` downloads the dependencies; `npx expo start` launches the development server.
*   **Reasoning:** Installation happens once; starting the server happens every time you develop.

**18. Why use `useState` and `useEffect` in a game?**
*   **Answer:** `useState` manages the game state (snake position), and `useEffect` handles the game loop/timer.
*   **Reasoning:** Games are state-driven; the screen must re-render every time the snake moves.

**19. What is the purpose of `expo-status-bar`?**
*   **Answer:** To control the appearance of the device's top status bar.
*   **Reasoning:** Ensuring the status bar doesn't clash with the game's retro aesthetic.

**1n. What is the role of the "Metro Bundler"?**
*   **Answer:** It compiles your JavaScript code into a bundle that the mobile device can execute.
*   **Reasoning:** Mobile devices cannot execute raw JSX/Modern JS directly without bundling.

**21. What does `npx expo start --tunnel` do?**
*   **Answer:** It creates a secure tunnel to allow a device to connect to the server even if they aren't on the same Wi-Fi.
*   **Reasoning:** It bypasses network firewall issues.

---

### Category 3: Game Logic & Algorithms
**22. How is the snake represented in your code?**
*   **Answer:** As a contiguous array of Cartesian coordinate objects (e.g., `[{x: 5, y: 10}, {x: 4, y: 10}]`).
*   **Reasoning:** Arrays are perfect for maintaining the order of the snake's body segments.

**23. Explain the "head-prepend and tail-pop" algorithm.**
*   **Answer:** A new coordinate is added to the front of the array (head), and the last coordinate is removed (tail).
*   **Reasoning:** This creates the illusion of movement across the grid.

**24. How is "Recursive Growth" implemented when the snake eats food?**
*   **Answer:** The head is prepended, but the tail is NOT popped for that specific tick.
*   **Reasoning:** By not removing the tail, the array length increases by one, simulating growth.

**25. How do you handle collisions with the walls?**
*   **Answer:** By checking if the head's $X$ or $Y$ coordinates exceed the grid boundaries.
*   **Reasoning:** Boundary checks are the simplest way to trigger a "Termination" state.

**26. How is self-collision detected?**
*   **Answer:** By checking if the new head coordinate already exists within the body array.
*   **Reasoning:** If the head overlaps any body segment, it's a logical failure/game over.

**27. How do you prevent the snake from doing a 180-degree turn?**
*   **Answer:** By using a validation layer that compares the new input direction with the current direction.
*   **Reasoning:** In Snake, reversing directly into yourself results in an instant, unfair collision.

**28. What is "Vector Addition" in the context of your project?**
*   **Answer:** Adding a direction vector (e.g., `{x: 0, y: -1}` for Up) to the head's current coordinate.
*   **Reasoning:** This is the mathematical basis for 2D movement on a grid.

**29. How is food randomly generated?**
*   **Answer:** By generating random $X$ and $Y$ integers within the grid range.
*   **Reasoning:** Randomization ensures the game is unpredictable and challenging.

**30. What happens if food is generated on the snake's body?**
*   **Answer:** The logic must re-roll the coordinates until a free space is found.
*   **Reasoning:** Food appearing inside the snake is a bug and ruins the user experience.

**31. What is the time complexity of moving the snake?**
*   **Answer:** $O(1)$ for the movement operation (prepend/pop), but $O(n)$ for collision checking.
*   **Reasoning:** Checking if the head is in the body requires iterating through the body array of length $n$.

**32. Why is the game loop "state-driven"?**
*   **Answer:** Because every move depends on the previous state of the snake and the current input.
*   **Reasoning:** This ensures the game logic remains deterministic.

---

### Category 4: Temporal Control & Mathematics
**33. Explain the Interval Formula: $T_{tick} = \max(50ms, 200ms - (Level \times 20ms))$.**
*   **Answer:** It calculates the time between frames; higher levels decrease the time, increasing speed.
*   **Reasoning:** A smaller interval means the snake moves more frequently per second.

**34. Why is there a `max(50ms, ...)` in the formula?**
*   **Answer:** To prevent the game from becoming impossibly fast or crashing.
*   **Reasoning:** It sets a "hard cap" on the speed to ensure the game remains playable and the engine can keep up.

**35. What happens to the frame rate as the Level increases?**
*   **Answer:** The frame rate increases (the time between frames decreases).
*   **Reasoning:** This creates the feeling of increased difficulty and speed.

**36. How does `useEffect` manage the game timer?**
*   **Answer:** It starts a `setInterval` when the game is "Active" and clears it when "Paused" or "Terminated."
*   **Reasoning:** This prevents memory leaks and ensures the snake doesn't move while the game is paused.

**37. What is "Temporal Resolution" in your project?**
*   **Answer:** The frequency at which the game state is updated (the tick rate).
*   **Reasoning:** It defines how "smooth" or "fast" the movement appears to the player.

**38. Why is speed modulation inversely proportional to the Level constant?**
*   **Answer:** Because speed = 1/time. As the Level constant goes up, the tick time goes down.
*   **Reasoning:** This is the standard mathematical way to increase speed in a time-based loop.

**39. How does the coordinate system handle the grid?**
*   **Answer:** It uses a discrete integer-based system (e.g., 0 to 20) rather than pixels.
*   **Reasoning:** This simplifies collision logic; you only compare integers, not floating-point pixels.

**40. What is the "deterministic" nature of your game engine?**
*   **Answer:** Given the same input and state, the output (new position) will always be the same.
*   **Reasoning:** This is critical for game stability and fairness.

---

### Category 5: UI/UX & Design
**41. How did you implement the grid layout?**
*   **Answer:** Using a Flexbox-driven system of rows and columns.
*   **Reasoning:** Flexbox allows the grid to scale proportionally across different screen sizes.

**42. Why use monochromatic colors?**
*   **Answer:** To simulate the "Green LCD" look of the original Snake Xenzia.
*   **Reasoning:** It enhances the retro feel and nostalgic value of the app.

**43. How are directional inputs handled?**
*   **Answer:** Through dedicated directional input modules (buttons) on the screen.
*   **Reasoning:** Mobile devices lack physical arrow keys, so on-screen controls are necessary.

**44. What is "Aspect Ratio Integrity"?**
*   **Answer:** Ensuring the game area remains a consistent shape (e.g., square) regardless of the phone's height.
*   **Reasoning:** This prevents the game from looking stretched or squashed on different devices.

**45. How is the score updated in real-time?**
*   **Answer:** By updating a score state variable every time the snake's head intersects food coordinates.
*   **Reasoning:** Immediate feedback is essential for player engagement.

**46. Why use `portrait` mode exclusively?**
*   **Answer:** To mirror the design of the original handheld phones.
*   **Reasoning:** This provides a more authentic retro experience.

**47. How does the UI communicate the "Termination" state?**
*   **Answer:** By triggering a state change that likely displays a "Game Over" message or resets the screen.
*   **Reasoning:** The user needs clear visual feedback that the game has ended.

**48. What is the benefit of modular UI components?**
*   **Answer:** It allows you to separate the Control Panel from the Game Grid.
*   **Reasoning:** This makes the code easier to maintain and update.

**49. How do you ensure the game is responsive?**
*   **Answer:** By using percentage-based widths or Flexbox instead of fixed pixel values.
*   **Reasoning:** Fixed pixels would make the game too small on high-res screens or too large on low-res ones.

**50. Why choose `light` user interface style in `app.json`?**
*   **Answer:** To complement the light-green LCD background.
*   **Reasoning:** It ensures the overall app theme is consistent with the game screen.

---

### Category 6: State Management & Hooks
**51. Why use `useState` for the snake's position instead of a global variable?**
*   **Answer:** Because React only re-renders the UI when the state changes.
*   **Reasoning:** A global variable would update the data, but the user wouldn't see the snake move on the screen.

**52. What is the purpose of the `useEffect` dependency array in your game loop?**
*   **Answer:** To tell React to restart the timer only when specific variables (like `gameState` or `level`) change.
*   **Reasoning:** Without it, the timer would restart on every single render, causing the game to glitch.

**53. How do you handle the "Paused" state logically?**
*   **Answer:** By stopping the interval timer in the `useEffect` hook.
*   **Reasoning:** Stopping the timer freezes the state updates, which freezes the snake's movement.

**54. What is a "Hook" in React?**
*   **Answer:** Functions that let you "hook into" React state and lifecycle features from function components.
*   **Reasoning:** They replace the need for complex Class components.

**55. Why is `useEffect` used for the game loop instead of a `while` loop?**
*   **Answer:** A `while` loop would block the main JavaScript thread, freezing the entire app.
*   **Reasoning:** `setInterval` (inside `useEffect`) allows the app to breathe and handle user inputs between ticks.

**56. How do you synchronize the game loop with the state?**
*   **Answer:** By using the functional update pattern: `setSnake(prevSnake => ... )`.
*   **Reasoning:** This ensures the new state is based on the most recent version of the snake, avoiding "stale closures."

**57. What is "State Persistence" in the context of your proposal?**
*   **Answer:** Maintaining the game's current data (score, level, snake length) across renders.
*   **Reasoning:** It ensures the game doesn't reset every time a small UI change occurs.

**58. How would you implement a High Score using state?**
*   **Answer:** By using `AsyncStorage` to save the score to the device's local memory.
*   **Reasoning:** Standard state is lost when the app closes; local storage is needed for persistence.

**59. Why is the "Active" state a boolean or a string?**
*   **Answer:** To easily toggle the game logic on and off.
*   **Reasoning:** Simplifies the conditional check: `if (gameState === 'Active') { moveSnake() }`.

**60. What is "reconciliation" in React Native?**
*   **Answer:** The process by which React updates only the parts of the UI that have changed.
*   **Reasoning:** This is why the game runs smoothly; only the snake segments that move are updated in the DOM.

---

### Category 7: Performance & Complexity
**61. What is the memory overhead of your application?**
*   **Answer:** Negligible.
*   **Reasoning:** The app only stores a small array of coordinates and a few integers.

**62. Why is the "head-prepend and tail-pop" algorithm efficient?**
*   **Answer:** Because it avoids recreating the entire snake array from scratch every tick.
*   **Reasoning:** It minimizes memory allocation and CPU usage.

**63. How does the "React Native reconciliation engine" help performance?**
*   **Answer:** It minimizes the number of updates sent to the native mobile UI layer.
*   **Reasoning:** Updating the native screen is expensive; React optimizes this by batching changes.

**64. What happens to performance as the snake gets longer?**
*   **Answer:** The collision check takes slightly longer ($O(n)$).
*   **Reasoning:** The engine must check the head against every single body segment.

**65. Why is the game loop's temporal resolution critical?**
*   **Answer:** If it's too slow, the game feels laggy; if it's too fast, it becomes unplayable.
*   **Reasoning:** It is the primary factor in the "feel" and difficulty of the game.

**66. How did you evaluate the performance of your app?**
*   **Answer:** By testing at Level X (maximum difficulty) to check for frame drops.
*   **Reasoning:** Max difficulty is the "stress test" for the game loop.

**67. What is the benefit of using the Expo ecosystem for performance?**
*   **Answer:** It provides optimized native modules for common tasks.
*   **Reasoning:** These modules are written in C++/Java/Swift, making them faster than pure JS.

**68. How does the "sandboxed environment" of React Native affect the game?**
*   **Answer:** It isolates the JS logic from the native OS, providing stability.
*   **Reasoning:** If the JS code crashes, it doesn't necessarily crash the entire phone OS.

**69. Why is "O(1) complexity" mentioned in your report?**
*   **Answer:** Prepending to an array is generally very fast.
*   **Reasoning:** It emphasizes that the core movement logic is computationally cheap.

**70. How does the use of Flexbox affect rendering performance?**
*   **Answer:** It is highly optimized by the native OS (Yoga engine).
*   **Reasoning:** Using native layout engines is faster than calculating positions manually in JS.

---

### Category 8: Development Process & Setup
**71. Why is Node.js required to run this project?**
*   **Answer:** Because React Native and Expo rely on the Node.js runtime for bundling and package management.
*   **Reasoning:** All modern JS build tools (Webpack, Metro) run on Node.js.

**72. What is the purpose of `npm install`?**
*   **Answer:** To download all libraries listed in `package.json` into the `node_modules` folder.
*   **Reasoning:** This ensures the developer has all the required tools to run the code.

**73. Why is Android Studio necessary for the emulator?**
*   **Answer:** It provides the Android SDK and the Virtual Device (AVD).
*   **Reasoning:** You cannot simulate an Android environment without the official SDK.

**74. What is "Expo Go"?**
*   **Answer:** An app that allows you to run your project on a physical device without compiling a full APK.
*   **Reasoning:** It speeds up development by allowing instant updates via QR code.

**75. Why is Git mentioned as optional in your setup guide?**
*   **Answer:** Because the project can be run from a zip file, but Git is used for version control.
*   **Reasoning:** Version control is a professional standard, but not a technical requirement for execution.

**76. What does `npx` do?**
*   **Answer:** It allows you to execute a package without installing it globally.
*   **Reasoning:** This prevents "version conflict" issues on your machine.

**77. How do you troubleshoot "Network Issues" with the QR code?**
*   **Answer:** By using `npx expo start --tunnel`.
*   **Reasoning:** Tunneling bypasses local IP restrictions.

**78. What is the purpose of deleting `node_modules` and running `npm install` again?**
*   **Answer:** To clear corrupted packages and perform a "clean" installation.
*   **Reasoning:** This is the standard fix for "missing module" errors.

**79. Why is the web version not the primary focus?**
*   **Answer:** Because the game is optimized for mobile aspect ratios and touch inputs.
*   **Reasoning:** Retro mobile games are intended for a handheld feel.

**80. How do you deploy this app to a real phone permanently?**
*   **Answer:** By using EAS (Expo Application Services) to build an `.apk` or `.aab` file.
*   **Reasoning:** `Expo Go` is for development; a build is required for production/distribution.

---

### Category 9: Software Engineering & Standards
**81. What is "Modular Application Design"?**
*   **Answer:** Breaking the app into independent components (e.g., Snake, Food, Controls).
*   **Reasoning:** This makes the code reusable and easier to debug.

**82. How did you ensure "Logic Clarity" without comments?**
*   **Answer:** By using semantic variable naming (e.g., `snakeBody` instead of `sb`).
*   **Reasoning:** Clear names explain *what* the code does, reducing the need for comments.

**83. What is "Functional Decomposition"?**
*   **Answer:** Breaking a large problem (The Game) into smaller, manageable functions (e.g., `checkCollision()`, `moveSnake()`).
*   **Reasoning:** It simplifies testing and maintenance.

**84. Why is "Deterministic Logic" important in software engineering?**
*   **Answer:** It makes the software predictable and easier to test.
*   **Reasoning:** Non-deterministic software is prone to "random" bugs that are hard to reproduce.

**85. What is a "Technical Case Study" in your conclusion?**
*   **Answer:** An analysis of how a specific technology (React Native) solves a specific problem (Legacy Logic).
*   **Reasoning:** It moves the project from "just a game" to an "academic exercise."

**86. How would you implement Unit Testing for the collision logic?**
*   **Answer:** By creating a test case with a known head position and body array and asserting the result.
*   **Reasoning:** This ensures that a change in movement logic doesn't break the game-over logic.

**87. What is "Asynchronous Storage" (mentioned in Future Work)?**
*   **Answer:** A system to store data on the device that doesn't block the main thread.
*   **Reasoning:** Local storage is slow; doing it asynchronously prevents the game from stuttering.

**88. How does the "Sandboxed Environment" improve security?**
*   **Answer:** It restricts the app's access to the device's core system unless explicitly permitted.
*   **Reasoning:** This is a standard security feature of mobile OSs and frameworks.

**89. What is the "Efficacy" of JavaScript frameworks in this project?**
*   **Answer:** High, because JS can handle the grid logic and state updates efficiently enough for a 2D game.
*   **Reasoning:** JS is fast enough for this complexity level without needing C++.

**90. How do you manage "Dependency Hell" in your project?**
*   **Answer:** By using `package-lock.json`.
*   **Reasoning:** The lock file ensures every developer uses the exact same versions of the libraries.

---

### Category 10: Future Work & Critical Thinking
**91. How would you implement "Haptic Feedback"?**
*   **Answer:** By using `expo-haptics` to vibrate the phone when the snake eats food or dies.
*   **Reasoning:** It adds a tactile dimension to the user experience.

**92. If you wanted to add "Walls/Obstacles," how would you change the logic?**
*   **Answer:** By creating another array of "Obstacle Coordinates" and checking for intersections during every tick.
*   **Reasoning:** This adds a new layer of collision detection.

**93. How would you implement a "Two-Player Mode"?**
*   **Answer:** By adding a second snake array and a second set of controls.
*   **Reasoning:** The engine would simply need to run two movement and collision loops simultaneously.

**94. What is the biggest technical challenge you faced?**
*   **Answer:** (Sample) Synchronizing the game loop with the React state to avoid lag.
*   **Reasoning:** Because React's rendering cycle and `setInterval` don't always align perfectly.

**95. Why not use a professional game engine like Unity?**
*   **Answer:** Unity is overkill for a simple 2D grid game.
*   **Reasoning:** React Native is lighter and faster to deploy for simple UI-based games.

**96. How would you implement a "Save Game" feature?**
*   **Answer:** By saving the current snake array, score, and level to local storage.
*   **Reasoning:** This allows players to resume from where they left off.

**97. If the game lags at Level X, what is the first thing you would optimize?**
*   **Answer:** The collision detection loop.
*   **Reasoning:** It's the only part of the code with $O(n)$ complexity.

**98. How would you add sound effects?**
*   **Answer:** By using `expo-av` to play short audio clips on specific events.
*   **Reasoning:** Audio cues provide essential feedback to the player.

**99. How would you make the food "Special" (e.g., bonus points)?**
*   **Answer:** By adding a `type` property to the food object (e.g., `{x: 1, y: 2, type: 'gold'}`).
*   **Reasoning:** This allows the scoring logic to apply different arithmetic based on the food type.

**100. What is the most important lesson you learned from this project?**
*   **Answer:** (Sample) The importance of separating game logic from the UI layer.
*   **Reasoning:** It allows you to change how the game *looks* without breaking how it *works*.



প্রজেক্টটি মূলত **React Native** এবং **Hooks (`useState`, `useEffect`)** দিয়ে তৈরি। নিচে বিস্তারিত আলোচনা করা হলো:

---

### ১. গেম লুপ এবং মুভমেন্ট (Game Loop & Movement)
**প্রশ্ন: এই গেমটি কীভাবে চলে? কোডিং লেভেলে মুভমেন্ট কীভাবে কাজ করে?**

**উত্তর:**
এই গেমটি একটি **Interval-based Loop** এর ওপর চলে। `useEffect` এর ভেতরে `setInterval` ব্যবহার করা হয়েছে, যা প্রতি নির্দিষ্ট মিলিসেকেন্ড পর পর একটি ফাংশন কল করে।

**কাজ করার পদ্ধতি:**
*   সাপের শরীরকে একটি **Array of Coordinates** (যেমন: `[{x: 10, y: 5}, {x: 10, y: 6}]`) হিসেবে রাখা হয়েছে।
*   **Movement Logic:** প্রতি টিক-এ (tick), সাপটি যেদিকে যাচ্ছে সেদিকে মাথার (head) জন্য একটি নতুন কো-অর্ডিনেট তৈরি করা হয় এবং সেটি অ্যারের শুরুতে যোগ করা হয় (**Prepend**)। একই সময়ে অ্যারের একদম শেষ এলিমেন্টটি (লেজ) মুছে ফেলা হয় (**Pop**)।
*   এর ফলে মনে হয় সাপটি সামনের দিকে এগিয়ে যাচ্ছে।

**কোড পরিবর্তন করতে চাইলে:**
আপনি যদি সাপের মুভমেন্টের গতি পরিবর্তন করতে চান, তবে `setInterval` এর সময়টি (যেমন: `200ms`) কমিয়ে বা বাড়িয়ে দিন। সময় কমলে সাপ দ্রুত চলবে।

---

### ২. সাপের বৃদ্ধি (Snake Growth/Eating Food)
**প্রশ্ন: সাপ যখন খাবার খায়, তখন তার শরীর কীভাবে বড় হয়?**

**উত্তর:**
এটি একটি খুব সহজ লজিক। সাধারণত প্রতি মুভমেন্টে আমরা লেজ থেকে একটি ঘর মুছে ফেলি (`pop`)। কিন্তু যখন সাপের মাথার কো-অর্ডিনেট এবং খাবারের কো-অর্ডিনেট মিলে যায় (Intersection), তখন আমরা লেজটি মুছে ফেলি না।

**কাজ করার পদ্ধতি:**
```javascript
if (head.x === food.x && head.y === food.y) {
    // লেজ মুছে ফেলবো না (No Pop), ফলে সাপ ১ ঘর বড় হবে
    // নতুন খাবার জেনারেট হবে
} else {
    // লেজ মুছে ফেলবো (Pop), সাপ আগের সাইজেই থাকবে
}
```

**কোড পরিবর্তন করতে চাইলে:**
যদি আপনি চান খাবার খেলে সাপ ২ ঘর বড় হবে, তবে আপনি লজিকটি এমনভাবে লিখবেন যেন খাবার খাওয়ার পর পরবর্তী ১-২টি মুভমেন্টে লেজ `pop` না হয়।

---

### ৩. কলিশন ডিটেকশন (Collision Detection)
**প্রশ্ন: সাপ কখন মরে যায়? এটা কোডে কীভাবে চেক করা হয়?**

**উত্তর:**
এখানে দুই ধরণের কলিশন চেক করা হয়:
১. **Wall Collision:** যদি সাপের মাথার `x` বা `y` ভ্যালু গ্রিডের সীমানার বাইরে চলে যায় (যেমন: `x < 0` বা `x >= gridWidth`)।
২. **Self Collision:** যদি সাপের মাথার নতুন কো-অর্ডিনেটটি সাপের শরীরের অ্যারের (`snakeBody` array) মধ্যে আগে থেকেই থাকে।

**কাজ করার পদ্ধতি:**
```javascript
const isCollision = snakeBody.some(segment => segment.x === head.x && segment.y === head.y);
if (isCollision) {
    setGameState('Termination'); // Game Over
}
```

**কোড পরিবর্তন করতে চাইলে:**
আপনি যদি **"Wall-passing"** মুড (দেওয়াল ভেদ করে অন্য পাশ দিয়ে আসা) যোগ করতে চান, তবে সীমানার বাইরে গেলে তাকে আবার বিপরীত পাশে পাঠিয়ে দিতে হবে (Modulo operator ব্যবহার করে)।

---

### ৪. লেভেল এবং স্পিড কন্ট্রোল (Level & Speed Control)
**প্রশ্ন: লেভেল বাড়লে গেমের গতি কীভাবে বাড়ে?**

**উত্তর:**
আপনার রিপোর্টে একটি ফর্মুলা দেওয়া আছে: $T_{tick} = 200ms - (Level \times 20ms)$।
অর্থাৎ, লেভেল যত বাড়বে, `setInterval` এর সময় তত কমবে। সময় কমলে লুপটি দ্রুত চলবে, ফলে সাপ দ্রুত মুভ করবে।

**কোড পরিবর্তন করতে চাইলে:**
আপনি যদি চান লেভেল বাড়লে গতি খুব বেশি না বাড়ুক, তবে `20ms` এর জায়গায় `10ms` করে দিন।

---

### ৫. গ্রিড এবং ইউআই (Grid & UI Layout)
**প্রশ্ন: গ্রিড সিস্টেম কীভাবে কাজ করে?**

**উত্তর:**
পুরো স্ক্রিনটিকে একটি কাল্পনিক গ্রিডে ভাগ করা হয়েছে (যেমন: ২০x২০)। প্রতিটি ঘর একটি নির্দিষ্ট সাইজের (যেমন: ২০ পিক্সেল)। সাপের মুভমেন্ট পিক্সেল দিয়ে নয়, বরং গ্রিড নাম্বার (0, 1, 2...) দিয়ে হিসাব করা হয়। পরে রেন্ডার করার সময় তাকে `position: absolute` দিয়ে পিক্সেল-এ রূপান্তর করা হয়।

**কোড পরিবর্তন করতে চাইলে:**
*   **কালার পরিবর্তন:** `styles` ফাইল থেকে `#8bab3e` (সবুজ) পরিবর্তন করে আপনার পছন্দমতো রঙ দিতে পারেন।
*   **গ্রিড সাইজ:** গ্রিডের ভেরিয়েবল (যেমন: `GRID_SIZE = 20`) পরিবর্তন করলে পুরো গেমের ম্যাপ ছোট বা বড় হবে।

---

### সংক্ষেপে ভাইভা টিপস (Quick Summary for Viva):

*   **কীভাবে কাজ করে?** $\rightarrow$ `setInterval` $\rightarrow$ Update Head $\rightarrow$ Pop Tail $\rightarrow$ Check Collision $\rightarrow$ Re-render UI.
*   **বড় হয় কীভাবে?** $\rightarrow$ খাবার খেলে লেজ `pop` করা হয় না।
*   **মরে যায় কেন?** $\rightarrow$ দেওয়ালের সীমানা ছাড়লে অথবা শরীরের কোনো অংশের সাথে মাথা মিলে গেলে।
*   **গতি বাড়ে কীভাবে?** $\rightarrow$ লেভেল বাড়লে ইন্টারভালের সময় (ms) কমিয়ে দেওয়া হয়।
*   **UI কেন রেসপন্সিভ?** $\rightarrow$ Flexbox এবং percentage-based layout ব্যবহার করা হয়েছে।



আপনার দেওয়া কোডটি একটি চমৎকার এবং স্ট্যান্ডার্ড **React Native Snake Game**। এখন আমি আপনার এই নির্দিষ্ট কোডটির ওপর ভিত্তি করে **লাইন নম্বরসহ** বিস্তারিত বুঝিয়ে দিচ্ছি। আপনি যখন ভাইভায় কথা বলবেন বা কোড পরিবর্তন করবেন, তখন এই পয়েন্টগুলো ব্যবহার করবেন।

---

### ১. কালার বা রঙের পরিবর্তন (Visual Change)
আপনার কোডের একদম নিচের দিকে `const styles = StyleSheet.create({...})` ব্লকে সব কালার দেওয়া আছে।

*   **পুরো অ্যাপের ব্যাকগ্রাউন্ড কালার:** লাইন নং **১৪৫** (`container` $\rightarrow$ `backgroundColor: '#8bab3e'`)। এটি পরিবর্তন করলে পুরো স্ক্রিনের রঙ বদলে যাবে।
*   **গেম বোর্ডের কালার:** লাইন নং **১৭৫** (`board` $\rightarrow$ `backgroundColor: '#98b64e'`)। এটি বোর্ডের ভেতরের রঙ।
*   **সাপ এবং খাবারের কালার:** লাইন নং **১৮৩** এবং **১৯১** (`backgroundColor: '#000'`)। এখানে কালো রঙের বদলে অন্য রঙ দিতে পারেন।
*   **বাটন এবং টেক্সটের কালার:** লাইন নং **১৫৫, ১৬৩, ২০৬, ২২৩**। এখানে কালো এবং সবুজ রঙের কম্বিনেশন ব্যবহার করা হয়েছে।

---

### ২. গেমের স্পিড এবং লেভেল লজিক (Speed & Level)
গেমটি কত দ্রুত চলবে তা নিয়ন্ত্রণ করা হয়েছে `useEffect` এর ভেতর।

*   **স্পিড কন্ট্রোল লাইন:** লাইন নং **৬৬** $\rightarrow$ `const intervalId = setInterval(moveSnake, Math.max(50, 200 - level * 20));`
*   **কিভাবে কাজ করে:** এখানে `200` হলো শুরুর গতি (মিলি-সেকেন্ড)। লেভেল যত বাড়বে (`level * 20`), এই সময় তত কমবে, ফলে সাপ তত দ্রুত চলবে। `Math.max(50, ...)` দেওয়া হয়েছে যাতে স্পিড ৫০ মিলি-সেকেন্ডের নিচে নেমে গেমটি অসম্ভব কঠিন না হয়ে যায়।
*   **পরিবর্তন:** আপনি যদি গেমটি আরও স্লো করতে চান, তবে `200` এর জায়গায় `300` করে দিন।

---

### ৩. মুভমেন্ট এবং কোলিশন লজিক (Movement & Collision)
এটি গেমের সবচেয়ে গুরুত্বপূর্ণ অংশ, যা `moveSnake` ফাংশনের ভেতর আছে (লাইন নং **৩৯ - ৬৪**)।

*   **নতুন মাথা তৈরি:** লাইন নং **৪২-৪৫**। বর্তমান মাথার পজিশনের সাথে ডিরেকশনের `x` এবং `y` যোগ করে `newHead` তৈরি করা হয়।
*   **দেওয়াল এবং শরীরের সাথে ধাক্কা (Game Over):** লাইন নং **৪৭-৫৩**।
    *   `newHead.x < 0 || newHead.x >= GRID_SIZE` $\rightarrow$ বাম বা ডান দেওয়ালের সাথে ধাক্কা।
    *   `newHead.y < 0 || newHead.y >= GRID_SIZE` $\rightarrow$ উপর বা নিচের দেওয়ালের সাথে ধাক্কা।
    *   `prevSnake.some(...)` $\rightarrow$ সাপের মাথাটি যদি শরীরের কোনো অংশের সাথে মিলে যায়।
*   **পরিবর্তন (Teleport Mode):** আপনি যদি চান দেওয়ালের বাইরে গেলে সাপ অন্য পাশ দিয়ে ফিরে আসুক, তবে লাইন নং **৪৭-৫৩** এর কন্ডিশনটি মুছে দিয়ে Modulo operator ব্যবহার করতে হবে।

---

### ৪. খাবার এবং শরীরের বৃদ্ধি (Food & Growth)
সাপ কীভাবে বড় হয় তা লেখা আছে লাইন নং **৫৭-৬১** এ।

*   **খাবার খাওয়া:** লাইন নং **৫৭** $\rightarrow$ `if (newHead.x === food.x && newHead.y === food.y)`। যদি মাথার পজিশন আর খাবারের পজিশন মিলে যায়, তবে স্কোর ১ বাড়ে এবং নতুন খাবার জেনারেট হয়।
*   **বৃদ্ধি (Growth):** লাইন নং **৬০** $\rightarrow$ `newSnake.pop();`। যখন সাপ খাবার খায় না, তখন আমরা লেজ থেকে একটি অংশ কেটে ফেলি (`pop`)। কিন্তু খাবার খেলে আমরা `pop()` করি না, ফলে সাপের দৈর্ঘ্য ১ ঘর বেড়ে যায়।

---

### ৫. ১৮০ ডিগ্রি টার্ন বন্ধ করা (Direction Validation)
সাপ যেন সরাসরি উল্টো দিকে ঘুরতে না পারে, তার লজিক আছে `handlePress` ফাংশনে (লাইন নং **৬৯-৭৩**)।

*   **লজিক:** লাইন নং **৭০** $\rightarrow$ `if ((newDirection.x !== 0 && direction.x === 0) || (newDirection.y !== 0 && direction.y === 0))`।
*   **ব্যাখ্যা:** যদি সাপটি বর্তমানে X-অক্ষ বরাবর (ডানে/বামে) চলে, তবে সে কেবল Y-অক্ষ বরাবর (উপরে/নিচে) ঘুরতে পারবে। সরাসরি বিপরীত দিকে ঘুরলে সে নিজের শরীরের সাথে ধাক্কা খাবে, তাই এই চেকটি দেওয়া হয়েছে।

---

### ৬. গ্রিড এবং সাইজিং (Grid & Sizing)
স্ক্রিনের সাইজ অনুযায়ী গেম বোর্ড অ্যাডজাস্ট করা হয়েছে একদম শুরুতে।

*   **গ্রিড সাইজ:** লাইন নং **৭** $\rightarrow$ `const GRID_SIZE = 20;`। এর মানে পুরো বোর্ড ২০x২০ ঘরে বিভক্ত।
*   **সেল সাইজ:** লাইন নং **৮** $\rightarrow$ `const CELL_SIZE = Math.floor((width * 0.9) / GRID_SIZE);`। ফোনের স্ক্রিনের প্রস্থের ৯০% নিয়ে তাকে ২০ দিয়ে ভাগ করে প্রতিটি ঘরের সাইজ বের করা হয়েছে। এটি করার কারণে সব ফোনে গেমটি সুন্দরভাবে ফিট হবে।

---

### ভাইভার জন্য শর্টকাট গাইড (Quick Table):

| আপনি যা পরিবর্তন করতে চান | ফাইল/লাইন নং | কি পরিবর্তন করবেন |
| :--- | :--- | :--- |
| **রং বদলানো** | লাইন ১৪৫, ১৭৫, ১৮৩ | `backgroundColor` এর হেক্স কোড পরিবর্তন করুন। |
| **গতি বাড়ানো/কমানো** | লাইন ৬৬ | `200` বা `20` এর ভ্যালু পরিবর্তন করুন। |
| **বোর্ড ছোট/বড় করা** | লাইন ৭ | `GRID_SIZE` এর মান পরিবর্তন করুন (যেমন: ১০ বা ৩০)। |
| **শুরুতে সাপের দৈর্ঘ্য** | লাইন ১০ | `INITIAL_SNAKE` অ্যারেতে আরও এলিমেন্ট যোগ করুন। |
| **খাবার জেনারেট** | লাইন ২০-২৩ | `getRandomCoordinate` ফাংশনটি দেখুন। |
| **গেম ওভার লজিক** | লাইন ৪৭-৫৩ | এখানে কন্ডিশন পরিবর্তন করে নতুন রুলস যোগ করুন। |