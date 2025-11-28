# 🚀 K to K World - Quick Setup Guide

## ⚠️ CRITICAL: Two Steps Required for Custom Trip Form to Work

### Step 1: Enable Firestore API (2 minutes)

**Option A - Direct Link (Fastest):**
1. Click this link: https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=ktokworld-d1d3f
2. Click the **"ENABLE"** button
3. Wait 1-2 minutes for activation

**Option B - Firebase Console:**
1. Go to https://console.firebase.google.com/
2. Select project `ktokworld-d1d3f`
3. Click **"Firestore Database"** in left sidebar
4. Click **"Create database"**
5. Choose **"Start in production mode"**
6. Select region: `asia-south1` (or your preferred region)
7. Click **"Enable"**

**Set Security Rules:**
After database is created, go to the **Rules** tab and paste:
```javascript
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
    match /adminUsers/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
Click **"Publish"**

---

### Step 2: Setup Gmail App Password for Email Notifications (3 minutes)

**Get Gmail App Password:**
1. Go to: https://myaccount.google.com/apppasswords
2. Sign in with: **jayeshvjadhav23@gmail.com**
3. Click **"Create"** or **"Select app"**
4. Choose **"Mail"** and **"Other (Custom name)"**
5. Enter name: **"K to K World Website"**
6. Click **"Generate"**
7. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

**Update .env.local:**
1. Open `.env.local` file in your project
2. Replace this line:
   ```
   EMAIL_PASSWORD=your_gmail_app_password_here
   ```
   With your actual app password:
   ```
   EMAIL_PASSWORD=abcdefghijklmnop
   ```
   (Remove spaces from the password)
3. Save the file
4. Restart the development server

**⚠️ Important:**
- Use the **App Password**, NOT your regular Gmail password
- Remove all spaces from the 16-character password
- If you have 2FA disabled, enable it first at: https://myaccount.google.com/security

---

## ✅ Verification Steps

### Test Custom Trip Form:
1. Go to: http://localhost:3000/custom-trip
2. Fill out the form completely
3. Click **"Submit Request"**
4. You should receive:
   - ✅ Confirmation email at: **jayeshvjadhav23@gmail.com**
   - ✅ Notification email at: **ktoktourism@gmail.com**
   - ✅ Success message on the website

### Check Server Logs:
Look for these success messages:
```
✅ Custom request saved to Firestore
✅ Confirmation email sent successfully
```

---

## 🔧 Troubleshooting

### "Firestore API not enabled" error:
- Wait 2-3 minutes after enabling the API
- Refresh the Firebase Console
- Try submitting the form again

### "Email authentication failed" error:
- Make sure you're using **App Password**, not regular password
- Remove all spaces from the 16-character password
- Verify 2FA is enabled on your Gmail account
- Try generating a new App Password

### Form submits but no email received:
- Check spam/junk folder
- Verify EMAIL_USER is: `jayeshvjadhav23@gmail.com`
- Restart the development server after changing .env.local

---

## 📧 Email Configuration Details

**Current Setup:**
- Sender: `jayeshvjadhav23@gmail.com`
- Recipients: 
  - Customer: Their provided email
  - Admin: `jayeshvjadhav23@gmail.com`
  - Admin: `ktoktourism@gmail.com`

**What Emails Are Sent:**
1. **To Customer:** "Request Received! We will contact you soon"
2. **To Admins:** Full details of the custom trip request

---

## 🎯 Next Steps After Setup

1. **Test the form** - Submit a test request
2. **Verify emails arrive** - Check both admin emails
3. **Access admin panel** - Go to `/admin/login`
   - Email: `admin@ktokworld.com`
   - Password: `KtoKWorld@Admin2024!Secure`
4. **View submissions** - Check `/admin/custom-requests`

---

## 🆘 Need Help?

If you're still having issues after following these steps:
1. Check server logs in the terminal
2. Look for specific error messages
3. Verify both Firestore API and Email are configured
4. Try clearing browser cache and resubmitting

**Common Success Indicators:**
- Form submits in less than 5 seconds
- Success message appears immediately
- Confirmation emails arrive within 1 minute
