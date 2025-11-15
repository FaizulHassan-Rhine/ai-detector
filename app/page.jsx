'use client'

import { Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import AuthHandler from './components/AuthHandler'

export default function Home() {
  return (
    <main className=" flex flex-col">
      <Navbar />
      <Hero />
      <Footer />
      <Suspense fallback={null}>
        <AuthHandler />
      </Suspense>
    </main>
  )
}

