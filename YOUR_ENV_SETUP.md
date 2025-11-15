# 🔑 Your Environment Variables Setup

## ✅ Step 1: Create .env.local file

Create a file named `.env.local` in your project root (where package.json is).

**PowerShell command:**
```powershell
New-Item -Path .env.local -ItemType File -Force
```

---

## 📝 Step 2: Copy this content into .env.local

```env
# MongoDB Database (REQUIRED - Get from MongoDB Atlas)
MONGODB_URI=

# NextAuth Secret (REQUIRED - Already generated for you!)
NEXTAUTH_SECRET=IpBKVNlpInLUfmOqLxMo0xZC0z10TcFGPKOyIwYWtao=

# Your App URL (REQUIRED - Keep as is for development)
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (OPTIONAL - Can leave empty for now)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# AI Detection API (Already configured - Don't change)
API_KEY=Bearer e1280fff14f26b246073425df2ff87c9758b5b9a28ad81ecd6142ee767f2d4e4
```

---

## 🗄️ Step 3: Get MongoDB Connection String

### Quick MongoDB Atlas Setup:

1. **Go to:** https://cloud.mongodb.com

2. **Sign up** for free account

3. **Create a Cluster:**
   - Click "Build a Database"
   - Choose "M0 Free" tier
   - Select a region (closest to you)
   - Cluster name: Keep default or name it

4. **Create Database User:**
   - Username: `aidetector` (or your choice)
   - Password: Click "Autogenerate Secure Password" and **save it**
   - Click "Create User"

5. **Set Network Access:**
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

6. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

7. **Modify the connection string:**
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add `/ai-detector` before the `?`
   
   **Final format:**
   ```
   mongodb+srv://aidetector:YourPassword123@cluster0.xxxxx.mongodb.net/ai-detector?retryWrites=true&w=majority
   ```

8. **Paste it into .env.local:**
   ```env
   MONGODB_URI=mongodb+srv://aidetector:YourPassword123@cluster0.xxxxx.mongodb.net/ai-detector?retryWrites=true&w=majority
   ```

---

## ✅ Your .env.local Should Look Like This:

```env
# MongoDB Database
MONGODB_URI=mongodb+srv://aidetector:YourPassword123@cluster0.xxxxx.mongodb.net/ai-detector?retryWrites=true&w=majority

# NextAuth Secret
NEXTAUTH_SECRET=IpBKVNlpInLUfmOqLxMo0xZC0z10TcFGPKOyIwYWtao=

# Your App URL
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (leave empty for now)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# AI Detection API
API_KEY=Bearer e1280fff14f26b246073425df2ff87c9758b5b9a28ad81ecd6142ee767f2d4e4
```

**Replace only the MongoDB part with your actual credentials!**

---

## 🚀 Step 4: Start Your App

Once `.env.local` is saved with your MongoDB URI:

```bash
npm run dev
```

---

## 🧪 Step 5: Test It!

1. Go to: http://localhost:3000/signup
2. Fill in the form:
   - Name: Your Name
   - Email: test@example.com
   - Password: test123
3. Click "Create Account"
4. ✅ You should be logged in!

---

## 🔵 Google OAuth (Optional - Can Do Later)

If you want Google login:

1. Go to: https://console.cloud.google.com
2. Create new project
3. Enable "Google+ API"
4. Create OAuth 2.0 Client ID
5. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`

**You can skip this for now - email/password works without it!**

---

## 🎯 Summary Checklist

```
✅ NEXTAUTH_SECRET - Already generated: IpBKVNlpInLUfmOqLxMo0xZC0z10TcFGPKOyIwYWtao=
✅ NEXTAUTH_URL - Use: http://localhost:3000
✅ API_KEY - Already configured
☐ MONGODB_URI - Get from MongoDB Atlas (follow Step 3)
☐ Create .env.local file
☐ Paste MongoDB URI into MONGODB_URI
☐ Save file
☐ Run npm run dev
☐ Test signup!
```

---

## 🆘 Troubleshooting

**Error: "Please define the MONGODB_URI environment variable"**
- Make sure `.env.local` exists in project root (same folder as package.json)
- Check that `MONGODB_URI=` has a value after the equals sign
- Restart your dev server: Stop (Ctrl+C) and run `npm run dev` again

**Can't connect to MongoDB**
- Check username and password in connection string
- Make sure you added `/ai-detector` before the `?`
- Verify IP whitelist is set to 0.0.0.0/0 in MongoDB Atlas

**Session not working**
- Make sure `NEXTAUTH_SECRET` is set (already done!)
- Clear browser cookies
- Restart dev server

---

## 🎉 You're Almost There!

**You already have:**
- ✅ NEXTAUTH_SECRET generated
- ✅ All code files ready
- ✅ Dependencies installed

**You just need:**
- ☐ MongoDB Atlas account (free, takes 5 minutes)
- ☐ Create .env.local with the values above

Then you can start signing up users! 🚀

