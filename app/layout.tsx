import type { Metadata, Viewport } from 'next'
import { Inter, Raleway } from 'next/font/google'
import "../styles/globals.css"
import Navbar from "@/components/Navbar"
import PreFooter from "@/components/PreFooter"
import Footer from "@/components/Footer"
import MobileFooter from "@/components/MobileFooter"
import StyledComponentsRegistry from './registry'
import AnalyticsTracker from '@/components/AnalyticsTracker'
import { Analytics } from '@vercel/analytics/react'
import FloatingContact from "../components/FloatingContact"
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-raleway',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#4F46E5',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://roomyo.com'),
  title: {
    default: 'Roomyo - Find Your Perfect Property & PG Accommodation',
    template: '%s - Roomyo'
  },
  description: 'Find and book verified properties and PG accommodations across major Indian cities. Browse through our collection of premium spaces with detailed amenities and transparent pricing.',
  keywords: ['property', 'PG accommodation', 'rental', 'housing', 'real estate', 'India'],
  authors: [{ name: 'Roomyo' }],
  creator: 'Roomyo',
  publisher: 'Roomyo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: 'add-your-google-site-verification-here',
    yandex: 'add-your-yandex-verification-here',
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
    },
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://roomyo.com',
    siteName: 'Roomyo',
    title: {
      default: 'Roomyo - Find Your Perfect Property & PG Accommodation',
      template: '%s - Roomyo'
    },
    description: 'Find and book verified properties and PG accommodations across major Indian cities.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Roomyo - Property & PG Accommodation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roomyo - Find Your Perfect Property & PG Accommodation',
    description: 'Find and book verified properties and PG accommodations across major Indian cities.',
    images: ['/og-image.jpg'],
    creator: '@roomyo',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#4F46E5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${raleway.variable}`}>
      <body className="min-h-screen bg-white font-body">
        <StyledComponentsRegistry>
          <AnalyticsTracker />
          <Analytics />
          <Navbar />
          <div className="h-[64px] md:h-[120px]"></div>
          <main className="relative pb-12 md:pb-0">{children}</main>
          <PreFooter />
          <Footer />
          <MobileFooter />
          <FloatingContact />
          <Toaster position="bottom-right" />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
