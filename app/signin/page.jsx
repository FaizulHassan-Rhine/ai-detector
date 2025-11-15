'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'

export default function SignIn() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const toastId = toast.loading('Signing you in...')

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      })

      if (result.error) {
        throw new Error(result.error)
      }

      toast.success('Welcome back! Redirecting...', { id: toastId })
      
      // Redirect to home page on success
      setTimeout(() => {
        router.push('/')
        router.refresh()
      }, 500)
    } catch (error) {
      const errorMessage = error.message || 'Invalid email or password'
      toast.error(errorMessage, { id: toastId })
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      toast.loading('Redirecting to Google...')
      await signIn('google', { callbackUrl: '/?auth=google-success' })
    } catch (error) {
      toast.error('Failed to sign in with Google')
      setError('Failed to sign in with Google')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#000000' }}>
      <Navbar />
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Title */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to your account</p>
        </motion.div>

        {/* Sign In Form */}
        <motion.div
          className="rounded-xl p-8"
          style={{ backgroundColor: '#0a0a0a', border: '1px solid #333333' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-500 transition-all"
                  style={{ backgroundColor: '#000000', border: '1px solid #333333' }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #86F06F'}
                  onBlur={(e) => e.target.style.boxShadow = ''}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3 rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-500 transition-all"
                  style={{ backgroundColor: '#000000', border: '1px solid #333333' }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #86F06F'}
                  onBlur={(e) => e.target.style.boxShadow = ''}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 text-green-500 focus:ring-2 focus:ring-green-500"
                  style={{ accentColor: '#86F06F' }}
                />
                <span className="ml-2 text-gray-400">Remember me</span>
              </label>
              <Link href="#" className="text-gray-400 hover:opacity-80 transition-opacity" style={{ color: '#86F06F' }}>
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-black flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#86F06F' }}
              whileHover={!loading ? { scale: 1.02, backgroundColor: '#75df5e' } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t" style={{ borderColor: '#333333' }}></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t" style={{ borderColor: '#333333' }}></div>
          </div>

          {/* Google Sign In */}
          <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#0a0a0a', border: '1px solid #333333' }}
            whileHover={!loading ? { scale: 1.02, borderColor: '#86F06F' } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t" style={{ borderColor: '#333333' }}></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold hover:opacity-80 transition-opacity" style={{ color: '#86F06F' }}>
              Sign Up
            </Link>
          </p>
        </motion.div>
      </motion.div>
      </div>
    </div>
  )
}

