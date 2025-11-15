import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export const authOptions = {
  providers: [
    // Email/Password Provider
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          await connectDB()

          // Find user by email and include password
          const user = await User.findOne({ email: credentials.email }).select(
            '+password'
          )

          if (!user) {
            throw new Error('Invalid email or password')
          }

          // Check if user signed up with Google
          if (user.provider === 'google') {
            throw new Error('Please sign in with Google')
          }

          // Verify password
          const isPasswordValid = await user.comparePassword(
            credentials.password
          )

          if (!isPasswordValid) {
            throw new Error('Invalid email or password')
          }

          // Return user object (without password)
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            provider: user.provider,
          }
        } catch (error) {
          console.error('Auth error:', error)
          throw new Error(error.message || 'Authentication failed')
        }
      },
    }),

    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        try {
          await connectDB()

          // Check if user exists
          const existingUser = await User.findOne({ email: user.email })

          if (existingUser) {
            // Update user with Google info if they signed up with email/password before
            if (existingUser.provider === 'credentials') {
              existingUser.provider = 'google'
              existingUser.googleId = profile.sub
              existingUser.image = user.image
              existingUser.emailVerified = new Date()
              await existingUser.save()
            }
            // Store user ID for later use
            user.id = existingUser._id.toString()
            return true
          }

          // Create new user with Google
          const newUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: 'google',
            googleId: profile.sub,
            emailVerified: new Date(),
          })
          
          // Store user ID for later use
          user.id = newUser._id.toString()

          return true
        } catch (error) {
          console.error('Error during Google sign in:', error)
          return false
        }
      }

      return true
    },

    async jwt({ token, user, account }) {
      // When user signs in, get their ID from database
      if (user) {
        token.id = user.id
        token.provider = user.provider || 'credentials'
        token.email = user.email
      }
      
      // If token doesn't have ID but has email, fetch from database
      if (!token.id && token.email) {
        try {
          await connectDB()
          const dbUser = await User.findOne({ email: token.email })
          if (dbUser) {
            token.id = dbUser._id.toString()
          }
        } catch (error) {
          console.error('Error fetching user ID:', error)
        }
      }
      
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.provider = token.provider
      }
      return session
    },
  },

  pages: {
    signIn: '/signin',
    error: '/signin', // Redirect to signin page on error
    newUser: '/?auth=google-success', // Redirect new OAuth users to home with success param
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

