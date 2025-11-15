# ✅ Setup Checklist - Get Your Authentication Running

## 📋 Required Steps (Must Do)

### ☐ Step 1: Create .env.local File

```bash
# Copy the template
# Windows PowerShell:
Copy-Item ENV_TEMPLATE.txt .env.local

# Mac/Linux:
cp ENV_TEMPLATE.txt .env.local
```

### ☐ Step 2: Set Up MongoDB Database

**Option A: MongoDB Atlas (Free & Recommended)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster (M0 Free tier)
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Replace `<password>` with your database password
7. Replace `<database>` with `ai-detector`
8. Paste into `.env.local` as `MONGODB_URI`

**Example:**
```
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/ai-detector?retryWrites=true&w=majority
```

### ☐ Step 3: Generate NEXTAUTH_SECRET

**Windows PowerShell:**
```powershell
$bytes = New-Object Byte[] 32; [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes); [Convert]::ToBase64String($bytes)
```

**Mac/Linux:**
```bash
openssl rand -base64 32
```

Copy the output and paste into `.env.local`:
```
NEXTAUTH_SECRET=your-generated-secret-here
```

### ☐ Step 4: Set NEXTAUTH_URL

In `.env.local`:
```
NEXTAUTH_URL=http://localhost:3000
```

(Change to your production URL when deploying)

---

## 🎯 Optional Step (Google OAuth)

### ☐ Set Up Google OAuth (Can Skip for Now)

**If you want Google login:**

1. Go to https://console.cloud.google.com
2. Create new project or select existing
3. Navigate to "APIs & Services" → "Library"
4. Enable "Google+ API"
5. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
6. Application type: "Web application"
7. Add Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
8. Copy Client ID and Client Secret
9. Add to `.env.local`:

```
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

**If you skip Google OAuth:**
- Email/password authentication will still work perfectly
- Just leave Google credentials empty in `.env.local`
- You can add Google OAuth later anytime

---

## 🚀 Step 5: Start Your Application

```bash
npm run dev
```

Visit: http://localhost:3000

---

## ✨ Test Your Authentication

### ☐ Test Sign Up (Email/Password)

1. Go to http://localhost:3000/signup
2. Fill in:
   - Name: Your Name
   - Email: test@example.com
   - Password: test123 (or longer)
   - Confirm Password: test123
3. Click "Create Account"
4. ✅ Should redirect to home page, logged in
5. ✅ Should see your name in navbar

### ☐ Test Sign Out

1. Click "Logout" button in navbar
2. ✅ Should redirect to home page
3. ✅ Should see "Sign In" button

### ☐ Test Sign In (Email/Password)

1. Go to http://localhost:3000/signin
2. Enter email and password from signup
3. Click "Sign In"
4. ✅ Should be logged in
5. ✅ Should see your profile in navbar

### ☐ Test Google OAuth (If Configured)

1. Go to http://localhost:3000/signin
2. Click "Continue with Google"
3. Select your Google account
4. ✅ Should be logged in
5. ✅ Should see your Google name and picture

---

## 📂 Your .env.local Should Look Like This

```env
# MongoDB (REQUIRED)
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ai-detector?retryWrites=true&w=majority

# NextAuth (REQUIRED)
NEXTAUTH_SECRET=your-generated-32-char-secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (OPTIONAL)
GOOGLE_CLIENT_ID=your-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-secret

# AI Detection API (ALREADY CONFIGURED)
API_KEY=Bearer e1280fff14f26b246073425df2ff87c9758b5b9a28ad81ecd6142ee767f2d4e4
```

---

## 🆘 Troubleshooting

### Error: "Please define the MONGODB_URI environment variable"
→ You forgot to create `.env.local` or didn't add MongoDB URI

### Error: "Invalid email or password"
→ Make sure you're using the correct credentials from signup

### Google OAuth Not Working
→ Check redirect URIs in Google Cloud Console match exactly

### Session Not Persisting
→ Make sure `NEXTAUTH_SECRET` is set in `.env.local`

### Still Having Issues?
→ Read `SETUP_GUIDE.md` for detailed troubleshooting

---

## 📚 Documentation

- **QUICK_START.md** - Quick setup guide
- **SETUP_GUIDE.md** - Comprehensive setup instructions
- **AUTHENTICATION_SUMMARY.md** - Technical implementation details
- **ENV_TEMPLATE.txt** - Environment variables template

---

## ✅ Quick Summary

**Minimum to get started:**
1. ✅ Create `.env.local` from template
2. ✅ Add MongoDB connection string
3. ✅ Generate and add `NEXTAUTH_SECRET`
4. ✅ Run `npm run dev`

**That's it!** Email/password authentication will work immediately.

Google OAuth is optional and can be added anytime later.

---

## 🎉 Once Complete

You'll have:
- ✅ Working sign up with email/password
- ✅ Working sign in with email/password
- ✅ (Optional) Sign in with Google
- ✅ User sessions that persist for 30 days
- ✅ User profile displayed in navbar
- ✅ Secure password hashing
- ✅ Production-ready authentication

---

## 🚀 After Setup

Read the usage examples in `AUTHENTICATION_SUMMARY.md` to learn how to:
- Check if user is logged in
- Protect API routes
- Access user data in components
- Build authenticated features

---

**Need Help?** Check `SETUP_GUIDE.md` for detailed instructions!

