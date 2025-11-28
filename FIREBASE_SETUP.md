# 🔥 Firebase Setup Guide for K to K World

This guide will help you set up Firebase for the K to K World travel website admin panel.

---

## 📺 Video Tutorial Alternative

Prefer a video guide? Search YouTube for "Firebase Setup for Next.js" - many excellent tutorials available!

---

## ⏱️ Quick Setup (5 Minutes)

### 1️⃣ Create Firebase Project

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Sign in with your Google account
3. Click **"Add project"**
4. Enter project name: `ktok-world` (or any name you prefer)
5. Click "Continue"
6. Disable Google Analytics (optional, makes setup faster)
7. Click "Create project"
8. Wait for project creation (~30 seconds)
9. Click "Continue" when done

---

### 2️⃣ Register Web App

1. On the Firebase project home page, click the **Web icon** `</>`
2. Enter app nickname: `K to K World Website`
3. **Do NOT** check "Firebase Hosting" (we're using Vercel/local)
4. Click "Register app"
5. You'll see a code snippet with `firebaseConfig` - **KEEP THIS PAGE OPEN!**

---

### 3️⃣ Copy Configuration to .env.local

You should see something like this in Firebase:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC1234567890abcdefghijk",
  authDomain: "ktok-world.firebaseapp.com",
  projectId: "ktok-world",
  storageBucket: "ktok-world.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```

**Now, open `.env.local` in your project and replace the values:**

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijk
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ktok-world.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ktok-world
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ktok-world.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

⚠️ **Important**: Use YOUR actual values from Firebase, not the examples above!

Click "Continue to console" in Firebase after copying.

---

### 4️⃣ Enable Email Authentication

1. In Firebase Console sidebar, click **"Authentication"**
2. Click **"Get started"**
3. Click on **"Sign-in method"** tab
4. Find **"Email/Password"** in the providers list
5. Click on it
6. Toggle **"Enable"** switch to ON
7. Click **"Save"**

---

### 5️⃣ Create Admin User

1. Click on **"Users"** tab (still in Authentication)
2. Click **"Add user"** button (top right)
3. Enter:
   - **Email**: `admin@ktokworld.com`
   - **Password**: `KtoKWorld@Admin2024!Secure`
4. Click **"Add user"**
5. You should see the user appear in the list!

---

### 6️⃣ Set Up Firestore Database

1. In Firebase Console sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in production mode"** (we'll adjust rules later)
4. Click "Next"
5. Choose a Cloud Firestore location (select closest to your users)
   - For India: `asia-south1 (Mumbai)`
   - For US: `us-central1 (Iowa)`
   - For Europe: `europe-west1 (Belgium)`
6. Click "Enable"
7. Wait for database creation (~30 seconds)

---

### 7️⃣ Configure Firestore Rules

1. Once Firestore is created, click on the **"Rules"** tab
2. Replace the existing rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated admin users to read/write everything
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Allow public read access to destinations
    match /destinations/{destination} {
      allow read: if true;
    }
  }
}
```

3. Click **"Publish"**

---

### 8️⃣ Enable Storage (for image uploads)

1. In Firebase Console sidebar, click **"Storage"**
2. Click **"Get started"**
3. Click "Next" on the security rules dialog
4. Select the same location you chose for Firestore
5. Click "Done"

---

### 9️⃣ Test Your Setup

1. Your dev server should automatically reload
2. Open your browser to `http://localhost:3000/admin/login`
3. You should see the login page **WITHOUT** the red error message
4. Enter:
   - **Email**: `admin@ktokworld.com`
   - **Password**: `KtoKWorld@Admin2024!Secure`
5. Click "Sign In"
6. You should be redirected to the admin dashboard! 🎉

---

## ✅ Verification Checklist

Before moving on, verify:

- [ ] Firebase project created
- [ ] Web app registered and config copied to `.env.local`
- [ ] Email/Password authentication enabled
- [ ] Admin user created with correct credentials
- [ ] Firestore Database enabled
- [ ] Storage enabled
- [ ] Can log in at `/admin/login`
- [ ] Can access admin dashboard at `/admin`

---

## 🎨 Optional: Seed Sample Destinations

Once logged in, you can seed the database with sample destinations:

1. Open your browser console (F12)
2. Navigate to: `http://localhost:3000/api/seed`
3. This will populate your Firestore with 10 sample Indian destinations

Or run this in your terminal:
```bash
curl http://localhost:3000/api/seed
```

---

## 📧 Email Setup (Optional)

To enable email notifications for contact forms and trip requests:

### Using Gmail:

1. Enable 2-Factor Authentication on your Gmail account
2. Visit https://myaccount.google.com/apppasswords
3. Click "Create" and select "Mail" and your device
4. Copy the 16-character password
5. Update `.env.local`:

```env
EMAIL_USER=jayeshvjadhav23@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

(Remove spaces from the app password when pasting)

---

## 🔒 Security Best Practices

### For Development:
✅ `.env.local` is in `.gitignore` (already done)
✅ Use the default admin credentials provided

### For Production:
⚠️ Change the admin password immediately
⚠️ Set up proper Firestore security rules
⚠️ Enable Firebase App Check
⚠️ Use environment variables in your hosting platform

---

## 🐛 Common Issues & Solutions

### Issue: "Invalid API Key" error persists

**Solutions:**
1. Double-check you copied the ENTIRE config value (no extra spaces)
2. Make sure `.env.local` is in the project root (same folder as `package.json`)
3. Restart the dev server: Stop it (Ctrl+C) and run `npm run dev` again
4. Clear browser cache and refresh

### Issue: "User not found" when logging in

**Solutions:**
1. Go to Firebase Console → Authentication → Users
2. Verify the admin user exists with email `admin@ktokworld.com`
3. If not, add it again

### Issue: "Missing or insufficient permissions"

**Solutions:**
1. Make sure you enabled Firestore Database (Step 6)
2. Check Firestore Rules tab - ensure authenticated users have access
3. Try logging out and logging back in

### Issue: Can't upload images in admin panel

**Solutions:**
1. Make sure you enabled Storage (Step 8)
2. Check Storage Rules tab
3. Ensure your admin user is authenticated

---

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase Storage](https://firebase.google.com/docs/storage)

---

## 🎯 Next Steps

After completing this setup:

1. ✅ Log in to admin panel
2. ✅ Add/edit destinations
3. ✅ View contact inquiries
4. ✅ Manage trip requests
5. ✅ Test email notifications

Happy coding! 🚀
