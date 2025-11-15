'use client'

import { LogIn, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function Navbar() {
  const pathname = usePathname()
  const { data: session, status } = useSession()

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
            {session && <NavLink href="/dashboard">Dashboard</NavLink>}
            <div className="ml-4">
              {session ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border" style={{ borderColor: '#333333' }}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#86F06F] to-[#75df5e] flex items-center justify-center">
                      {session.user.image ? (
                        <Image 
                          src={session.user.image} 
                          alt={session.user.name} 
                          width={32} 
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <User className="w-4 h-4 text-black" />
                      )}
                    </div>
                    <span className="text-gray-300 text-sm">{session.user.name || session.user.email}</span>
                  </div>
                  <motion.button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-colors border"
                    style={{ backgroundColor: '#0a0a0a', borderColor: '#333333' }}
                    whileHover={{ scale: 1.05, borderColor: '#86F06F' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </motion.button>
                </div>
              ) : (
                <Link href="/signin">
                  <motion.button
                    className="flex items-center gap-2 px-5 py-2 rounded-lg text-black font-semibold transition-colors"
                    style={{ backgroundColor: '#86F06F' }}
                    whileHover={{ scale: 1.05, backgroundColor: '#75df5e' }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </motion.button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
