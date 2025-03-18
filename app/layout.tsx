import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import "../styles/globals.css"
import Navbar from "@/components/Navbar"
import PreFooter from "@/components/PreFooter"
import Footer from "@/components/Footer"
import MobileFooter from "@/components/MobileFooter"
import StyledComponentsRegistry from './registry'
import AnalyticsTracker from '@/components/AnalyticsTracker'
import { Analytics } from '@vercel/analytics/react'
import FloatingContact from "../components/FloatingContact"

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://roomyo.in'),
  title: {
    default: 'Roomyo - Find Your Perfect Property & Rental Spaces Accommodation',
    template: '%s | Roomyo'
  },
  description: 'Roomyo is your trusted platform for finding the perfect property or Rental Spaces accommodation across major Indian cities. Easy booking, verified listings, and hassle-free experience.',
  keywords: ['real estate', 'Rental Spaces accommodation', 'property rental', 'house hunting', 'rental properties', 'paying guest', 'India', 'accommodation'],
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
    title: 'Roomyo - Find Your Perfect Property & Rental Spaces Accommodation',
    description: 'Discover and book the perfect property or Rental Spaces accommodation across major Indian cities. Verified listings, easy booking, and 24/7 support.',
    url: 'https://roomyo.in',
    siteName: 'Roomyo',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Roomyo - Property & Rental Spaces Booking',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roomyo - Property & Rental Spaces Booking Made Easy',
    description: 'Find your perfect property or Rental Spaces accommodation across major Indian cities',
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
    <html lang="en" className={raleway.className}>
      <body className={`min-h-screen bg-white ${raleway.className}`}>
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
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
