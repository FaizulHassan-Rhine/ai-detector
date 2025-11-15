'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

export default function AuthHandler() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Handle OAuth errors
    const error = searchParams.get('error')
    
    if (error) {
      if (error === 'OAuthSignin') {
        toast.error('Error connecting to Google. Please try again.')
      } else if (error === 'OAuthCallback') {
        toast.error('Error during Google sign in. Please try again.')
      } else if (error === 'OAuthCreateAccount') {
        toast.error('Could not create account. Please try again.')
      } else {
        toast.error('Authentication failed. Please try again.')
      }
    }
  }, [searchParams])

  useEffect(() => {
    // Show success toast when user returns from Google OAuth
    const authStatus = searchParams.get('auth')
    
    if (authStatus === 'google-success' && status === 'authenticated' && session) {
      toast.success(`Welcome, ${session.user.name}! Successfully signed in with Google`)
      
      // Clean up URL parameter
      window.history.replaceState({}, '', '/')
    }
  }, [searchParams, status, session])

  return null
}

