# GitHub Release Guidelines: Snake Xenzia

Follow these steps to formally publish a release of the Snake Xenzia project on GitHub.

## I. Preparation and Build
Before creating a release, ensure the application is stable and the documentation is updated.

1.  **Version Update:** Increment the `version` in `package.json` and the `versionCode`/`version` in `app.json`.
2.  **Generate Production Build:**
    *   If using EAS Build (recommended for Expo):
        ```bash
        eas build --platform android --profile preview
        ```
    *   This will generate an `.apk` file that can be downloaded from the Expo dashboard.
3.  **Local Artifacts:** Ensure you have the final `snake_xenzia.zip` and the production `.apk` ready for upload.

## II. Pushing to GitHub
Ensure all latest changes and documentation are pushed to the main branch:
```bash
git add .
git commit -m "chore: prepare for v1.0.0 release"
git push origin main
```

## III. Creating the Release on GitHub
1.  Navigate to your repository on GitHub.
2.  Click on **Releases** in the right-hand sidebar.
3.  Click **Draft a new release**.
4.  **Tag version:** Click "Choose a tag" and type `v1.0.0` (ensure it matches your `package.json`). Click **Create new tag**.
5.  **Release title:** Use a descriptive title like `v1.0.0 - Initial Academic Release`.
6.  **Description:** Summarize the release. Example:
    ```markdown
    ## Changes
    - Implementation of classic Snake Xenzia mechanics.
    - Integrated Level/Speed control system (Levels 1-10).
    - Academic Proposal and Report included.
    - Windows setup documentation.

    ## Assets
    - `snake-xenzia-v1.0.0.apk`: Ready to install on Android.
    - `source-code.zip`: Clean project archive (excluding node_modules).
    ```
7.  **Attach Binaries:** Drag and drop the following files into the "Attach binaries" box:
    *   The generated `.apk` file.
    *   The `snake_xenzia.zip` archive.
    *   (Optional) PDF versions of the Proposal and Report.

## IV. Publishing
1.  Check **Set as the latest release**.
2.  Click **Publish release**.

## V. Verification
Verify the release by checking the "Releases" section of your repository. Download the APK and ZIP files to ensure they are accessible and functional.
