'use client'

import { Image, LogIn } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <motion.nav 
      className="sticky top-0 z-50 backdrop-blur-md border-b shadow-sm" 
      style={{ backgroundColor: '#00000080', borderColor: '#333333' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            
            <span className="text-xl font-bold text-[#86F06F] hover:opacity-80 transition-opacity">AI Detector</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-300 transition-colors hover:opacity-80" style={{ color: '#d1d5db' }} onMouseEnter={(e) => e.target.style.color = '#86F06F'} onMouseLeave={(e) => e.target.style.color = '#d1d5db'}>
              Home
            </Link>
            <Link href="/api-docs" className="text-gray-300 transition-colors hover:opacity-80" onMouseEnter={(e) => e.target.style.color = '#86F06F'} onMouseLeave={(e) => e.target.style.color = '#d1d5db'}>
              API Docs
            </Link>
            <Link href="#" className="text-gray-300 transition-colors hover:opacity-80" onMouseEnter={(e) => e.target.style.color = '#86F06F'} onMouseLeave={(e) => e.target.style.color = '#d1d5db'}>
              About
            </Link>
            <div className="ml-4">
              <Link href="/signin">
                <motion.button
                  className="flex items-center gap-2 px-5 py-2 rounded-lg text-black font-semibold transition-colors"
                  style={{ backgroundColor: '#86F06F' }}
                  whileHover={{ scale: 1.05, backgroundColor: '#75df5e' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
