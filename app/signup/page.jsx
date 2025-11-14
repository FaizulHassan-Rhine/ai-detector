'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    // Handle sign up logic here
    console.log('Sign up:', formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: '#000000' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo/Title */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/">
            <h1 className="text-3xl font-bold text-white mb-2 cursor-pointer hover:opacity-80 transition-opacity">
              AI Detector
            </h1>
          </Link>
          <p className="text-gray-400">Create your account</p>
        </motion.div>

        {/* Sign Up Form */}
        <motion.div
          className="rounded-xl p-8"
          style={{ backgroundColor: '#0a0a0a', border: '1px solid #333333' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-500 transition-all"
                  style={{ backgroundColor: '#000000', border: '1px solid #333333' }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #86F06F'}
                  onBlur={(e) => e.target.style.boxShadow = ''}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3 rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-500 transition-all"
                  style={{ backgroundColor: '#000000', border: '1px solid #333333' }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #86F06F'}
                  onBlur={(e) => e.target.style.boxShadow = ''}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                required
                className="w-4 h-4 rounded border-gray-600 mt-1"
                style={{ accentColor: '#86F06F' }}
              />
              <label className="ml-2 text-sm text-gray-400">
                I agree to the{' '}
                <Link href="#" className="hover:opacity-80 transition-opacity" style={{ color: '#86F06F' }}>
                  Terms & Conditions
                </Link>
                {' '}and{' '}
                <Link href="#" className="hover:opacity-80 transition-opacity" style={{ color: '#86F06F' }}>
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Sign Up Button */}
            <motion.button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-black flex items-center justify-center gap-2 transition-all"
              style={{ backgroundColor: '#86F06F' }}
              whileHover={{ scale: 1.02, backgroundColor: '#75df5e' }}
              whileTap={{ scale: 0.98 }}
            >
              Create Account
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t" style={{ borderColor: '#333333' }}></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t" style={{ borderColor: '#333333' }}></div>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <Link href="/signin" className="font-semibold hover:opacity-80 transition-opacity" style={{ color: '#86F06F' }}>
              Sign In
            </Link>
          </p>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
            ← Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

