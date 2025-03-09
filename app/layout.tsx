import type { Metadata } from 'next'
import { Inter, Raleway } from 'next/font/google'
import "../styles/globals.css"
import Navbar from "@/components/Navbar"
import PreFooter from "@/components/PreFooter"
import Footer from "@/components/Footer"
import StyledComponentsRegistry from './registry'
import AnalyticsTracker from '@/components/AnalyticsTracker'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-raleway',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://roomyo.in'),
  title: {
    default: 'Roomyo - Find Your Perfect Property & PG Accommodation',
    template: '%s | Roomyo'
  },
  description: 'Roomyo is your trusted platform for finding the perfect property or PG accommodation across major Indian cities. Easy booking, verified listings, and hassle-free experience.',
  keywords: ['real estate', 'PG accommodation', 'property rental', 'house hunting', 'rental properties', 'paying guest', 'India', 'accommodation'],
  authors: [
    { name: 'Roomyo', url: 'https://roomyo.in' },
  ],
  creator: 'Roomyo',
  publisher: 'Roomyo Pvt. Ltd.',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Roomyo - Find Your Perfect Property & PG Accommodation',
    description: 'Discover and book the perfect property or PG accommodation across major Indian cities. Verified listings, easy booking, and 24/7 support.',
    url: 'https://roomyo.in',
    siteName: 'Roomyo',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Roomyo - Property & PG Booking',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roomyo - Property & PG Booking Made Easy',
    description: 'Find your perfect property or PG accommodation across major Indian cities',
    images: ['/og-image.jpg'],
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
    google: 'add-your-google-site-verification-here',
  },
  category: 'Real Estate & Accommodation',
  classification: 'Property Rental',
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
          <div className="h-[64px] md:h-[144px]"></div>
          <main className="relative pb-16 md:pb-0">{children}</main>
          <PreFooter />
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
