# FTR Atlası Android app

This small Android app opens the published FTR Atlası site in Android System WebView. It adds no JavaScript bridge and no third-party Android libraries. Site progress is stored by the WebView on the device, separately from Chrome.

## Build a test APK

Open this android folder in Android Studio and allow Gradle sync to install the required Android SDK components. Or use a machine with JDK 17, Gradle 9.6.0, and Android SDK Platform 36:

    gradle :app:assembleDebug

The debug APK is written to:

    app/build/outputs/apk/debug/app-debug.apk

GitHub Actions also builds this APK for pushes and pull requests. Download the artifact named ftr-atlasi-debug-apk from the completed workflow run, transfer it to an Android device, and install it. Android may ask to allow installation from the file browser used to open the APK.

This debug APK is for device testing. It is not a store-ready, signed release package. A release APK or Play Store submission needs a release signing key and a separate release process.

The app requires an internet connection. It opens FTR Atlası over HTTPS; external HTTPS links open in the browser. Secure HTTPS embeds, including the 3D anatomy viewer, remain inside the page.
