# K to K World - Travel & Tourism Platform

A comprehensive full-stack travel and tourism web application built with Next.js, Firebase, and modern web technologies.

## 🌟 Features

### Public Website
- **Home Page**: Hero banner with search, featured destinations, stats, and CTAs
- **Destinations**: Browse all tour packages with filtering and search
- **Destination Details**: Complete itinerary, pricing, highlights, and booking options
- **About Page**: Company story, mission, vision, team, and values
- **Services Page**: School tours, corporate trips, adventure tours, theme parks
- **Custom Trip Request**: Form with immediate email notifications
- **Contact Form**: Direct inquiry system with email confirmations
- **Responsive Design**: Mobile-first, glassmorphism UI with smooth animations

### Admin Panel
- **Secure Authentication**: Firebase-based admin login
- **Dashboard**: Real-time stats, recent requests, and quick actions
- **Destinations Management**: Full CRUD operations for tour packages
- **Trip Requests**: View and manage custom trip inquiries with status tracking
- **Contact Messages**: Review and respond to customer inquiries
- **Protected Routes**: Auth-guarded admin pages

### Technical Features
- **Firebase Integration**: Authentication, Firestore database, real-time updates
- **Email Notifications**: Automatic emails to both customers and admin
- **Form Validation**: React Hook Form with Zod schemas
- **Modern UI**: Tailwind CSS, Framer Motion animations, Shadcn/UI components
- **Type Safety**: Full TypeScript implementation
- **API Routes**: RESTful Next.js API endpoints
- **SEO Optimized**: Metadata and semantic HTML

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Firebase account
- Gmail account for email notifications

### 1. Clone and Install

```bash
# Install dependencies
npm install
# or
bun install
```

### 2. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Name: "k-to-k-world" (or your preferred name)
4. Disable Google Analytics (optional)
5. Click "Create Project"

#### Enable Authentication
1. In Firebase Console, go to **Authentication**
2. Click "Get Started"
3. Enable **Email/Password** sign-in method
4. Click "Save"

#### Create Admin User
1. Go to **Authentication > Users**
2. Click "Add User"
3. **Email**: `admin@ktokworld.com`
4. **Password**: `KtoKWorld@2024!Secure#Travel`
5. Click "Add User"

**IMPORTANT**: These credentials are saved in `ADMIN_CREDENTIALS.md` file (not committed to git).

#### Setup Firestore Database
1. Go to **Firestore Database**
2. Click "Create Database"
3. Start in **Production Mode**
4. Choose your preferred location
5. Click "Enable"

#### Configure Firestore Rules
Go to **Firestore Database > Rules** and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read for destinations
    match /destinations/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Admin only for requests and contacts
    match /customRequests/{document=**} {
      allow read, write: if request.auth != null;
      allow create: if true;
    }
    
    match /contacts/{document=**} {
      allow read, write: if request.auth != null;
      allow create: if true;
    }
  }
}
```

Click "Publish" to save the rules.

#### Get Firebase Configuration
1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click the **Web icon** (</>)
4. Register app name: "K to K World"
5. Copy the configuration object

### 3. Email Configuration (Gmail)

#### Enable App Password
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security**
3. Enable **2-Step Verification** (required)
4. Search for "App passwords"
5. Click "App passwords"
6. Select app: "Mail"
7. Select device: "Other" (enter "K to K World")
8. Click "Generate"
9. Copy the 16-character password (save it securely!)

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_char_app_password
```

**Important**: 
- Use the App Password (16 characters) for `EMAIL_PASSWORD`, NOT your Gmail password
- Replace `your_email@gmail.com` with the Gmail account you set up
- Never commit `.env.local` to version control
- Emails will be sent to **jayeshvjadhav23@gmail.com** and **ktoktourism@gmail.com**

### 5. Run Development Server

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### 6. Seed Database

After starting the dev server, seed with 10 sample destinations:

**Method 1 - Via Admin Dashboard:**
1. Login to admin: http://localhost:3000/admin/login
2. Credentials: See `ADMIN_CREDENTIALS.md` file
   - Email: `admin@ktokworld.com`
   - Password: `KtoKWorld@2024!Secure#Travel`
3. On dashboard, click "Seed Database"
4. Confirm the action

**Method 2 - Via API:**
```bash
curl -X POST http://localhost:3000/api/seed \
  -H "Content-Type: application/json" \
  -d '{"secret":"ktok-seed-2024"}'
```

## 🔐 Admin Access

### Admin Credentials

**⚠️ IMPORTANT: Full credentials are in `ADMIN_CREDENTIALS.md` file**

```
Email: admin@ktokworld.com
Password: KtoKWorld@2024!Secure#Travel
```

### Admin Panel URL
```
http://localhost:3000/admin/login
```

### Admin Panel Pages
- **Dashboard**: `/admin` - Stats and recent activity
- **Destinations**: `/admin/destinations` - Manage tour packages
- **Trip Requests**: `/admin/custom-requests` - View customer inquiries
- **Contacts**: `/admin/contacts` - Manage contact messages

### First Time Setup
1. Create admin user in Firebase Console with the credentials above
2. Login at http://localhost:3000/admin/login
3. Click "Seed Database" on the dashboard
4. Start managing destinations and viewing requests

## 📧 Email Notifications

### Automatic Emails Sent To:
✅ **jayeshvjadhav23@gmail.com** (as requested - primary recipient)
✅ **ktoktourism@gmail.com** (company email)
✅ Customer confirmation email

### Email is sent IMMEDIATELY when:
- Customer submits custom trip request form
- Customer submits contact form

### Test Email Delivery
1. Submit custom trip form: http://localhost:3000/custom-trip
2. Check **jayeshvjadhav23@gmail.com** inbox (should receive within seconds)
3. Check customer email for confirmation
4. Verify **ktoktourism@gmail.com** also received the inquiry

## 🛠️ Troubleshooting

### ❌ Admin Dashboard Not Loading

**Solutions**:
1. **Clear cache and try incognito mode**
2. **Verify you're logged in**: Check `/admin/login`
3. **Check browser console** (F12) for errors
4. **Verify Firebase config** in `.env.local`
5. **Restart dev server** after env changes
6. **Check Firestore rules** allow authenticated access

### ❌ Email Not Sending

**Solutions**:
1. **Use App Password** (16 characters), NOT Gmail password
2. **Enable 2-Step Verification** on Gmail account
3. **Restart server** after updating `.env.local`
4. **Check server logs** for email errors
5. **Verify EMAIL_USER and EMAIL_PASSWORD** are correct
6. **Check spam/junk folder** for test emails

### ❌ Firebase Connection Errors

**Solutions**:
1. Verify all Firebase env variables are set
2. Check Firebase project is active
3. Ensure internet connection is stable
4. Check Firebase Console for service issues

### ❌ Cannot Add/Edit Destinations

**Solutions**:
1. Ensure admin is logged in
2. Check Firestore rules allow writes
3. Verify Firebase Auth is working
4. Check browser console for errors

## 🗄️ Database Collections

### `destinations`
- Tour packages with complete details
- Seeded with 10 Indian destinations

### `customRequests`
- Customer trip inquiries
- Status tracking: new → in_progress → closed

### `contacts`
- Contact form submissions
- Status management for follow-ups

## 📝 Admin Credentials Summary

**See `ADMIN_CREDENTIALS.md` for complete details**

```
URL: http://localhost:3000/admin/login
Email: admin@ktokworld.com
Password: KtoKWorld@2024!Secure#Travel
```

**Setup Steps:**
1. Create this user in Firebase Console > Authentication > Users
2. Use exact email and password above
3. Login to admin panel
4. Seed database with sample destinations

**To Reset Password:**
1. Firebase Console > Authentication > Users
2. Find admin user → Options (⋮) → Reset password
3. Follow email instructions

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel Dashboard
# Project > Settings > Environment Variables
```

### Environment Variables for Production
Add all variables from `.env.local` to your hosting platform.

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/UI
- **Animations**: Framer Motion
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Forms**: React Hook Form + Zod
- **Email**: Nodemailer
- **Date Handling**: date-fns

## 🎯 Key Features Checklist

- ✅ Public website with modern UI
- ✅ Admin panel with authentication
- ✅ Full CRUD for destinations
- ✅ Custom trip request form
- ✅ Contact form
- ✅ **Emails to jayeshvjadhav23@gmail.com (IMMEDIATE)**
- ✅ **Emails to ktoktourism@gmail.com**
- ✅ Customer confirmation emails
- ✅ Firebase integration
- ✅ Responsive design
- ✅ Form validation
- ✅ Status management
- ✅ 10 preloaded destinations
- ✅ Protected admin routes
- ✅ Real-time dashboard

## 💡 Important Notes

1. **Admin Login**: Use `admin@ktokworld.com` with password `KtoKWorld@2024!Secure#Travel`
2. **Email Recipients**: Automatically sends to jayeshvjadhav23@gmail.com and ktoktourism@gmail.com
3. **Email Timing**: Emails are sent IMMEDIATELY upon form submission
4. **Seed Data**: Click "Seed Database" in admin panel after first login
5. **App Password**: Required for Gmail - enable 2FA first
6. **Admin Panel**: Access at `/admin/login` (not `/admin` directly)
7. **Full Credentials**: See `ADMIN_CREDENTIALS.md` file (excluded from git)

## 🔒 Security

- Never commit `.env.local` or `ADMIN_CREDENTIALS.md`
- Use App Passwords for Gmail
- Enable 2FA on Firebase
- Update Firestore rules for production
- Monitor Firebase usage
- Change admin password for production

---

**Built for K to K World Travel & Tourism**

For support, check the Troubleshooting section or Firebase/server console logs.