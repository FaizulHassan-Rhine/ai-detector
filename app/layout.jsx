import './globals.css'
import { Comic_Neue } from 'next/font/google'

const comicNeue = Comic_Neue({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'AI Image Detection',
  description: 'Detect whether an image is AI-generated or Real',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={comicNeue.className}>{children}</body>
    </html>
  )
}

