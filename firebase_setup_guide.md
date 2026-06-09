# Firebase Project Setup & Key Generation Guide

This step-by-step guide explains how to set up a new Firebase project, enable Authentication and Firestore Database services, write security rules, and connect the credentials to your DSA Chronicles application.

---

## Step 1: Sign in to Firebase Console
1. Open your browser and navigate to the [Firebase Console](https://console.firebase.google.com/).
2. Log in using your Google account.

---

## Step 2: Create a Firebase Project
1. In the console, click the **Add project** (or **Create a project**) tile.
2. **Project Name**: Enter a name (e.g., `DSA Chronicles Tracker`).
3. Click **Continue**.
4. **Google Analytics**: Toggle Google Analytics to **Disabled** (this is optional, but disabling it speeds up project setup and avoids unnecessary telemetry tracking).
5. Click **Create project** and wait for the provisioning to finish.
6. Once ready, click **Continue** to load your project dashboard.

---

## Step 3: Register a Web Application
1. In the center of your project dashboard, click the **Web icon (`</>`)** to register a web app.
2. **App nickname**: Enter a nickname (e.g., `dsa-tracker-client`).
3. **Firebase Hosting**: Leave the checkbox for *Firebase Hosting* **unchecked** for now.
4. Click **Register app**.

---

## Step 4: Copy the API Configuration Keys
1. Under the **Add Firebase SDK** section, select the **npm** option.
2. Look for the `firebaseConfig` object. It will look like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "your-project-id.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "123456789...",
     appId: "1:123456789...:web:abcdef..."
   };
   ```
3. Copy these specific string values. You will need them for your local environment variables file.
4. Click **Continue to console** at the bottom of the page.

---

## Step 5: Enable Authentication Providers
1. In the Firebase Console left-sidebar menu, click **Build** -> **Authentication**.
2. Click the **Get started** button.
3. Under the **Sign-in method** tab, click **Email/Password** under *Additional providers*:
   - Toggle **Email/Password** to **Enabled**.
   - Leave *Email link (passwordless sign-in)* disabled.
   - Click **Save**.
4. Now, click **Add new provider** and select **Google**:
   - Toggle **Enable** at the top right.
   - Enter a **Project support email** (select your Google email address from the dropdown list).
   - Click **Save**.

---

## Step 6: Create the Firestore Database & Security Rules
1. In the left-sidebar menu, click **Build** -> **Firestore Database**.
2. Click the **Create database** button.
3. **Database location**: Choose a regional location closest to you (e.g., `nam5 (us-central)` or `asia-south1`). Click **Next**.
4. **Security rules**: Select **Start in locked mode** (recommended for production security). Click **Create**.
5. Once database creation completes, click the **Rules** tab at the top.
6. Replace the default rules with the rules below. This ensures users can only read and write their own progress data and notes:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```
7. Click the **Publish** button to apply the security rules.

---

## Step 7: Configure Environment Variables
1. In your local codebase root, create a file named `.env.local` by copying `.env.local.example`:
   - Duplicate `.env.local.example` and rename it to `.env.local`.
2. Fill in the keys you copied in **Step 4**:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789...
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789...:web:abcdef...
   ```
3. If your Next.js development server is currently running, **restart it** in the terminal so it pulls in the new env file values:
   - Press `Ctrl + C` in the terminal to stop the server, then run `npm run dev` to start it again.

---

## Step 8: Whitelist Deployment Domains (e.g. Vercel)
If you host your website (e.g., on Vercel at `dsa-chronicles.vercel.app`), Firebase will reject Google Sign-In requests with the error `auth/unauthorized-domain` until the domain is whitelisted in the Firebase Console.

1. Open the [Firebase Console](https://console.firebase.google.com/) and go to your project dashboard.
2. In the left-sidebar, click on **Build** -> **Authentication**.
3. Select the **Settings** tab at the top of the Authentication page.
4. In the side sub-menu, click on **Authorized domains**.
5. Click the **Add domain** button.
6. Enter your deployment domain name:
   `dsa-chronicles.vercel.app`
   *(Do not include `https://` or URL subpaths like `/login` — just enter the bare domain).*
7. Click **Add**.
8. It will take about 10–30 seconds to update. Once added, Google Sign-In will work seamlessly on your hosted website!
