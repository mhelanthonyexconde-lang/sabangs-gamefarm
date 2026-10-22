# Sabang’s Gamefarm website (HTML + CSS + JavaScript + Firebase)

## A. Open the project in VS Code
1. Open VS Code. Click **File** (top menu) > **Open Folder...** and pick the `gamefarm` folder.
2. Click the **Extensions** icon (four squares) in the left bar. In the search box type **Live Server**, then click **Install** on "Live Server" by Ritwick Dey.

## B. Create your Firebase project (free)
1. Go to https://console.firebase.google.com and sign in. Click **Create a project**, give it a name, and click through the steps.
2. Click **Build** in the left menu > **Authentication** > **Get started** > click **Email/Password** > turn **Enable** on > **Save**.
3. Click **Build** > **Firestore Database** > **Create database** > choose a location near you > **Start in production mode** > **Create**.
4. Click the **Rules** tab. Click inside the box, right-click > **Select All**, right-click > **Paste** the full text of `firestore.rules` from this folder, then click **Publish**.
5. Click the gear icon (top left) > **Project settings**. Scroll to "Your apps" and click the **</>** (web) icon. Name it and click **Register app**. Copy the `firebaseConfig` values.
6. Your Firebase values are already in `js/firebase-config.js`. If login or saving fails, compare each value there with the ones in Firebase and fix any difference.

## C. Make yourself the admin
1. In VS Code, right-click `index.html` > **Open with Live Server**. Click **Login** > **Sign up** and create your account.
2. In Firebase, click **Authentication** > **Users** and copy your **User UID** (hover the UID, click the copy icon).
3. Click **Firestore Database** > **Start collection**. Collection ID: `admins`. Document ID: paste your UID. Add a field named `role` with value `admin`. Click **Save**.
4. Refresh the website. An **Admin** button now shows next to your avatar.

## D. Use it
- Admin > **Manage gamecocks**: add birds (name, breed, category, weight, price, photo).
- Customers: browse, search and filter, then **Reserve & Book Visit**.
- Admin > **Appointments**: set each booking to Pending / Confirmed / Completed / Cancelled.

Notes: photos are resized and stored inside Firestore (no paid Storage needed). One visit per date-and-time slot (no double booking). No online payment.
