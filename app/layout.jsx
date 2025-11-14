import './globals.css'
import { Comic_Neue } from 'next/font/google'

const comicNeue = Comic_Neue({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'AI Detector - Detect AI-Generated Images',
  description: 'Detect whether an image is AI-generated or Real using advanced deep learning technology. Fast, accurate, and privacy-first image authenticity detection.',
  keywords: ['AI detection', 'image detection', 'AI generated', 'fake image detector', 'deep learning', 'image authenticity'],
  authors: [{ name: 'AI Detector' }],
  creator: 'AI Detector',
  publisher: 'AI Detector',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/logo.ico' },
      { url: '/logo192.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/logo.ico',
    apple: '/logo192.png',
  },
  openGraph: {
    title: 'AI Detector - Detect AI-Generated Images',
    description: 'Detect whether an image is AI-generated or Real using advanced deep learning technology.',
    url: 'https://aidetector.com',
    siteName: 'AI Detector',
    images: [
      {
        url: '/logo512.png',
        width: 512,
        height: 512,
        alt: 'AI Detector Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Detector - Detect AI-Generated Images',
    description: 'Detect whether an image is AI-generated or Real using advanced deep learning technology.',
    images: ['/logo512.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={comicNeue.className}>{children}</body>
    </html>
  )
}

