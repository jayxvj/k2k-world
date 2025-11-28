# ⚡ Quick Fix Checklist - Custom Trip Form

## 🎯 Complete These 2 Steps to Fix Your Form

### ✅ Step 1: Enable Firestore API (2 minutes)

**Click this direct link:**
👉 https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=ktokworld-d1d3f

Then click **"ENABLE"** button

**After enabling, set security rules:**
1. Go to: https://console.firebase.google.com/project/ktokworld-d1d3f/firestore
2. Click **"Rules"** tab
3. Paste these rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /destinations/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /contacts/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /customRequests/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```
4. Click **"Publish"**

---

### ✅ Step 2: Get Gmail App Password (3 minutes)

**Get your password:**
1. Go to: https://myaccount.google.com/apppasswords
2. Sign in with: **jayeshvjadhav23@gmail.com**
3. Click **"Create"**
4. App: **Mail**, Device: **Other (K to K World)**
5. Click **Generate**
6. **Copy the 16-character password**

**Update your .env.local:**
1. Open `.env.local` file
2. Find line: `EMAIL_PASSWORD=your_gmail_app_password_here`
3. Replace with: `EMAIL_PASSWORD=abcdefghijklmnop` (your actual password, no spaces)
4. Save file
5. **Restart the development server**

---

## 🧪 Test It!

After completing both steps:

1. Go to: http://localhost:3000/custom-trip
2. Fill out the form
3. Click "Submit Request"
4. You should get:
   - ✅ Success message on website
   - ✅ Email at **jayeshvjadhav23@gmail.com**
   - ✅ Email at **ktoktourism@gmail.com**

---

## 🆘 Troubleshooting

**Still not working?**
- Wait 2-3 minutes after enabling Firestore API
- Make sure you removed all spaces from the Gmail App Password
- Restart the dev server after changing .env.local
- Check spam folder for emails

**Error Messages:**
- "PERMISSION_DENIED" = Firestore API not enabled yet (wait a bit)
- "Invalid login" = Wrong Gmail App Password (regenerate it)
