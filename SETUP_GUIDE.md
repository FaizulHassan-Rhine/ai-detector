# Authentication Setup Guide

This guide will help you set up authentication for your AI Detector application with Email/Password and Google OAuth.

## 📋 Prerequisites

- Node.js 18+ installed
- A MongoDB database (free tier from MongoDB Atlas works great)
- A Google Cloud account (for OAuth)

---

## 🚀 Quick Start

### 1. Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 2. Set Up MongoDB Database

#### Option A: MongoDB Atlas (Recommended - Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier is perfect)
4. Click "Connect" on your cluster
5. Choose "Connect your application"
6. Copy the connection string
7. Replace `<password>` with your database user password
8. Replace `<database>` with your database name (e.g., `ai-detector`)

#### Option B: Local MongoDB

```bash
# Install MongoDB locally and use:
MONGODB_URI=mongodb://localhost:27017/ai-detector
```

### 3. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth Credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add Authorized redirect URIs:
     - For development: `http://localhost:3000/api/auth/callback/google`
     - For production: `https://yourdomain.com/api/auth/callback/google`
   - Click "Create"
   - Copy the Client ID and Client Secret

### 4. Configure Environment Variables

1. Copy the example environment file:

```bash
cp .env.local.example .env.local
```

2. Open `.env.local` and fill in your credentials:

```env
# MongoDB Connection
MONGODB_URI=your-mongodb-connection-string

# NextAuth Secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your-random-secret-key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# AI Detection API (already configured)
API_KEY=Bearer e1280fff14f26b246073425df2ff87c9758b5b9a28ad81ecd6142ee767f2d4e4
```

3. Generate a secure NEXTAUTH_SECRET:

```bash
# On Linux/Mac:
openssl rand -base64 32

# On Windows (PowerShell):
$bytes = New-Object Byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

### 5. Start the Development Server

```bash
npm run dev
```

Your app should now be running at [http://localhost:3000](http://localhost:3000)

---

## 🔐 Authentication Features

### Implemented Features

✅ **Email/Password Authentication**
- User registration with email and password
- Secure password hashing with bcrypt
- Password validation (minimum 6 characters)
- Email uniqueness validation

✅ **Google OAuth**
- One-click sign in with Google
- Auto account creation
- Profile picture sync

✅ **Session Management**
- JWT-based sessions
- 30-day session duration
- Secure HTTP-only cookies

✅ **User Interface**
- Beautiful sign-up page at `/signup`
- Sign-in page at `/signin`
- User profile display in navbar
- Logout functionality
- Loading states and error handling

### How It Works

#### Sign Up Flow
1. User fills out the form (name, email, password)
2. Client validates password match and length
3. API creates user in MongoDB with hashed password
4. User is automatically signed in
5. Redirected to home page

#### Sign In Flow (Email/Password)
1. User enters email and password
2. NextAuth verifies credentials
3. Password is compared with bcrypt
4. JWT session is created
5. User is redirected to home page

#### Sign In Flow (Google)
1. User clicks "Continue with Google"
2. Redirected to Google OAuth consent screen
3. User authorizes the app
4. Google returns user profile
5. User account is created/updated in MongoDB
6. JWT session is created
7. User is redirected to home page

---

## 🗂️ Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.js  # NextAuth configuration
│   │   │   └── signup/route.js         # Registration API
│   │   └── detect/route.js             # AI detection API
│   ├── signin/page.jsx                 # Sign in page
│   ├── signup/page.jsx                 # Sign up page
│   ├── components/
│   │   └── Navbar.jsx                  # Navbar with session
│   ├── providers.jsx                   # NextAuth SessionProvider
│   └── layout.jsx                      # Root layout
├── lib/
│   └── mongodb.js                      # MongoDB connection
├── models/
│   └── User.js                         # User model schema
├── middleware.js                       # Route protection (optional)
└── .env.local                          # Environment variables
```

---

## 🛡️ Security Features

1. **Password Security**
   - Bcrypt hashing with salt rounds
   - Minimum password length validation
   - Passwords never stored in plain text

2. **Session Security**
   - HTTP-only cookies
   - Secure flag in production
   - JWT tokens with expiration

3. **Database Security**
   - Connection string in environment variables
   - Mongoose schema validation
   - Indexed fields for performance

4. **OAuth Security**
   - Google OAuth 2.0 implementation
   - Secure token handling
   - Email verification through Google

---

## 🔒 Protecting Routes (Optional)

If you want to protect certain routes (require authentication), edit `middleware.js`:

```javascript
export const config = {
  matcher: [
    '/dashboard/:path*',  // Protect dashboard
    '/profile/:path*',    // Protect profile
    '/settings/:path*',   // Protect settings
  ]
}
```

Users will be redirected to `/signin` if they try to access protected routes without authentication.

---

## 📱 Using Session in Your Components

### Client Components

```jsx
'use client'
import { useSession } from 'next-auth/react'

export default function MyComponent() {
  const { data: session, status } = useSession()
  
  if (status === 'loading') return <div>Loading...</div>
  if (!session) return <div>Not signed in</div>
  
  return <div>Welcome, {session.user.name}!</div>
}
```

### Server Components (App Router)

```jsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function MyPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return <div>Not signed in</div>
  }
  
  return <div>Welcome, {session.user.name}!</div>
}
```

### API Routes

```javascript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // Your protected API logic
}
```

---

## 🎨 Customization

### Change Session Duration

Edit `app/api/auth/[...nextauth]/route.js`:

```javascript
session: {
  strategy: 'jwt',
  maxAge: 7 * 24 * 60 * 60, // 7 days instead of 30
}
```

### Add More OAuth Providers

Install the provider package and add to `providers` array:

```javascript
import GithubProvider from 'next-auth/providers/github'

providers: [
  // ... existing providers
  GithubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  }),
]
```

### Customize Sign-In Page

The custom sign-in page is at `app/signin/page.jsx`. Modify the styling and layout as needed.

---

## 🐛 Troubleshooting

### "Please define the MONGODB_URI environment variable"

Make sure `.env.local` exists and contains your MongoDB connection string.

### Google OAuth not working

1. Check that redirect URIs are correctly set in Google Cloud Console
2. Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
3. Make sure `NEXTAUTH_URL` matches your domain

### "Invalid email or password"

This can happen if:
- User doesn't exist
- Password is incorrect
- User signed up with Google (can't use email/password login)

### Session not persisting

1. Check that `NEXTAUTH_SECRET` is set
2. Clear browser cookies
3. Restart the development server

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Update `NEXTAUTH_URL` to your production URL
5. Add production URL to Google OAuth redirect URIs

### Other Platforms

Make sure to:
1. Set all environment variables
2. Update `NEXTAUTH_URL` to production URL
3. Update OAuth redirect URIs
4. Use secure HTTPS connection

---

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Google OAuth Setup Guide](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Documentation](https://nextjs.org/docs)

---

## 🤝 Support

If you encounter any issues:

1. Check the console for error messages
2. Verify all environment variables are set
3. Check the troubleshooting section above
4. Review the NextAuth.js documentation

---

## ✨ What's Next?

Consider adding:
- Email verification
- Password reset functionality
- Two-factor authentication
- User profile management
- Admin dashboard
- Role-based access control

---

**Congratulations!** 🎉 Your authentication system is now set up and ready to use!

