# 🚀 Quick Start - Authentication Setup

## ✅ What Has Been Implemented

Your AI Detector app now has a complete authentication system with:

- ✅ **Email/Password Authentication** - Users can sign up and sign in with email
- ✅ **Google OAuth** - One-click sign in with Google
- ✅ **MongoDB Database** - User data storage
- ✅ **Session Management** - JWT-based sessions with NextAuth.js
- ✅ **Protected Routes** - Middleware for route protection (optional)
- ✅ **User Profile Display** - Navbar shows logged-in user info
- ✅ **Secure Password Hashing** - Bcrypt encryption

---

## 🎯 Next Steps to Get Started

### Step 1: Create .env.local File

Create a file named `.env.local` in your project root and copy the contents from `ENV_TEMPLATE.txt`:

```bash
# Windows PowerShell
Copy-Item ENV_TEMPLATE.txt .env.local

# Linux/Mac
cp ENV_TEMPLATE.txt .env.local
```

### Step 2: Get MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env.local`

**Example:**
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ai-detector?retryWrites=true&w=majority
```

### Step 3: Generate NextAuth Secret

Run this command to generate a secure secret:

**Windows PowerShell:**
```powershell
$bytes = New-Object Byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

**Linux/Mac:**
```bash
openssl rand -base64 32
```

Copy the output and paste it as `NEXTAUTH_SECRET` in `.env.local`

### Step 4: Set Up Google OAuth (Optional but Recommended)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Go to Credentials → Create OAuth 2.0 Client ID
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

**If you skip Google OAuth for now:**
- Just leave the Google credentials empty
- Email/password authentication will still work
- You can add Google OAuth later

### Step 5: Start Your App

```bash
npm run dev
```

Your app will run at `http://localhost:3000`

---

## 🧪 Testing Authentication

### Test Email/Password Sign Up

1. Go to `http://localhost:3000/signup`
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
3. Click "Create Account"
4. You should be logged in and redirected to home page

### Test Sign In

1. Sign out using the logout button in navbar
2. Go to `http://localhost:3000/signin`
3. Enter your email and password
4. Click "Sign In"

### Test Google OAuth (if configured)

1. Go to `/signin` or `/signup`
2. Click "Continue with Google"
3. Select your Google account
4. You should be logged in

---

## 📁 What Was Created

### New Files

```
lib/
  └── mongodb.js                       # Database connection

models/
  └── User.js                          # User schema

app/
  ├── providers.jsx                    # NextAuth SessionProvider
  ├── api/
  │   └── auth/
  │       ├── [...nextauth]/route.js   # NextAuth configuration
  │       └── signup/route.js          # Registration API

middleware.js                          # Route protection (optional)
ENV_TEMPLATE.txt                       # Environment variables template
SETUP_GUIDE.md                         # Detailed setup guide
```

### Updated Files

```
app/
  ├── layout.jsx                       # Added SessionProvider
  ├── signup/page.jsx                  # Added backend integration
  ├── signin/page.jsx                  # Added NextAuth integration
  └── components/
      └── Navbar.jsx                   # Added user session display

package.json                           # Added auth packages
jsconfig.json                          # Updated path aliases
```

---

## 🔐 Authentication Flow Diagram

### Sign Up Flow
```
User fills form → Validate → Create user in MongoDB → Hash password → Auto login → Redirect home
```

### Sign In Flow (Email/Password)
```
User enters credentials → Verify with DB → Compare password → Create JWT session → Redirect home
```

### Sign In Flow (Google)
```
Click Google button → OAuth consent → Get user profile → Create/Update user → Create session → Redirect home
```

---

## 💡 How to Use Authentication in Your Code

### Check if User is Logged In (Client Component)

```jsx
'use client'
import { useSession } from 'next-auth/react'

export default function MyComponent() {
  const { data: session } = useSession()
  
  return (
    <div>
      {session ? (
        <p>Welcome, {session.user.name}!</p>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  )
}
```

### Protect API Routes

```javascript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // Your protected code here
}
```

### Sign Out User

```jsx
import { signOut } from 'next-auth/react'

<button onClick={() => signOut()}>
  Logout
</button>
```

---

## 🛡️ Security Features Included

- ✅ Password hashing with bcrypt
- ✅ JWT-based sessions
- ✅ HTTP-only cookies
- ✅ CSRF protection
- ✅ Secure OAuth flow
- ✅ Email validation
- ✅ Password length validation
- ✅ Environment variable protection

---

## 🎨 UI Features

- ✅ Loading states on buttons
- ✅ Error message display
- ✅ User profile in navbar
- ✅ Logout button
- ✅ Form validation
- ✅ Responsive design
- ✅ Smooth animations

---

## 📚 Important Files to Read

1. **SETUP_GUIDE.md** - Comprehensive setup instructions
2. **ENV_TEMPLATE.txt** - Environment variables template
3. **app/api/auth/[...nextauth]/route.js** - Authentication configuration

---

## 🆘 Common Issues

### "Please define the MONGODB_URI environment variable"
→ Make sure you created `.env.local` with your MongoDB connection string

### "Invalid email or password"
→ Make sure the user exists and password is correct

### Google OAuth not working
→ Check that redirect URIs are set correctly in Google Cloud Console

### Session not persisting
→ Make sure `NEXTAUTH_SECRET` is set in `.env.local`

---

## 🎉 You're All Set!

Your authentication system is fully integrated and ready to use. Users can now:

- ✅ Sign up with email/password
- ✅ Sign in with email/password
- ✅ Sign in with Google
- ✅ Stay logged in for 30 days
- ✅ Log out
- ✅ See their profile in the navbar

**Next steps:**
1. Set up your MongoDB database
2. Configure your environment variables
3. Test the authentication flow
4. Start building protected features!

For detailed setup instructions, see **SETUP_GUIDE.md**

---

## 📞 Need Help?

- Read the detailed **SETUP_GUIDE.md**
- Check [NextAuth.js Documentation](https://next-auth.js.org/)
- Review [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/)

