# 🔐 Admin Login Credentials

## Current Status: ⚠️ Firebase Configuration Required

The admin panel requires Firebase Authentication to be set up. Follow the steps below to configure it.

---

## 📋 Admin Credentials

Once Firebase is configured, use these credentials to log in:

- **Email**: `admin@ktokworld.com`
- **Password**: `KtoKWorld@Admin2024!Secure`

---

## 🚀 Quick Setup Guide (5 Minutes)

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard (you can disable Google Analytics for faster setup)

### Step 2: Get Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ → **Project Settings**
2. Scroll down to "Your apps" section
3. Click the Web icon `</>` to add a web app
4. Register your app with a nickname (e.g., "K to K World")
5. Copy the `firebaseConfig` object values

### Step 3: Update Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id
```

### Step 4: Enable Authentication

1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click "Get started"
3. Go to **Sign-in method** tab
4. Click "Email/Password"
5. Enable it and click "Save"

### Step 5: Create Admin User

1. In Firebase Console, go to **Authentication** → **Users** tab
2. Click "Add user"
3. Enter:
   - **Email**: `admin@ktokworld.com`
   - **Password**: `KtoKWorld@Admin2024!Secure`
4. Click "Add user"

### Step 6: Enable Firestore Database

1. In Firebase Console, go to **Firestore Database** (left sidebar)
2. Click "Create database"
3. Choose "Start in production mode" (we'll set up rules later)
4. Select a location close to your users
5. Click "Enable"

### Step 7: Restart & Login

1. The dev server will automatically reload
2. Go to `/admin/login`
3. Enter the credentials above
4. You should now have access to the admin dashboard! 🎉

---

## 🔗 Admin Panel URLs

- **Login Page**: `http://localhost:3000/admin/login`
- **Admin Dashboard**: `http://localhost:3000/admin`
- **Manage Destinations**: `http://localhost:3000/admin/destinations`
- **Custom Trip Requests**: `http://localhost:3000/admin/custom-requests`
- **Contact Inquiries**: `http://localhost:3000/admin/contacts`

---

## ❓ Troubleshooting

### Error: "Firebase: Error (auth/invalid-api-key)"

**Solution**: Your Firebase credentials are not configured correctly.
- Check that `.env.local` exists in your project root
- Verify all Firebase values are correct (no placeholder text)
- Restart the dev server after updating `.env.local`

### Error: "Firebase: Error (auth/user-not-found)"

**Solution**: The admin user hasn't been created in Firebase yet.
- Go to Firebase Console → Authentication → Users
- Add the admin user with email and password listed above

### Error: "Firebase: Error (auth/wrong-password)"

**Solution**: The password is incorrect.
- Use the password: `KtoKWorld@Admin2024!Secure`
- Or reset the password in Firebase Console → Authentication → Users

### Can't access admin dashboard after login

**Solution**: Check browser console for errors.
- Ensure you completed Step 6 (Enable Firestore Database)
- Clear browser cache and cookies
- Try logging out and logging in again

---

## 📧 Email Configuration (Optional)

For email notifications when users submit contact forms or trip requests:

1. Get a Gmail App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Create a new app password for "Mail"
   
2. Update `.env.local`:
   ```env
   EMAIL_USER=jayeshvjadhav23@gmail.com
   EMAIL_PASSWORD=your_16_character_app_password
   ```

---

## 🔒 Security Notes

- **Never commit** `.env.local` to version control
- Change the default admin password after first login
- Keep your Firebase API keys secure
- Set up proper Firestore security rules for production

---

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for detailed error messages
2. Verify all steps above were completed
3. Ensure your Firebase project has billing enabled (free tier is sufficient)