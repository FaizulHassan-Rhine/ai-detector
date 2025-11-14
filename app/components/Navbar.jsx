'use client'

import { LogIn } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Navbar() {
  const pathname = usePathname()

  const NavLink = ({ href, children }) => {
    const isActive = pathname === href
    
    return (
      <Link 
        href={href} 
        className="relative py-2 text-gray-300 transition-all hover:opacity-80"
        style={{ 
          color: isActive ? '#86F06F' : '#d1d5db',
        }}
        onMouseEnter={(e) => !isActive && (e.target.style.color = '#86F06F')}
        onMouseLeave={(e) => !isActive && (e.target.style.color = '#d1d5db')}
      >
        {children}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ 
              backgroundColor: '#86F06F',
              boxShadow: '0 0 8px #86F06F, 0 0 16px #86F06F'
            }}
            layoutId="activeNav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Link>
    )
  }

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
          <Link href="/" className="flex items-center gap-1 cursor-pointer group">
            <Image 
              src="/logo.png" 
              alt="AI Detector Logo" 
              width={70} 
              height={70}
              className="transition-transform group-hover:scale-110"
            />
            <span className="text-xl font-bold text-[#86F06F] group-hover:opacity-80 transition-opacity">Detector</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/api-docs">API Docs</NavLink>
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
