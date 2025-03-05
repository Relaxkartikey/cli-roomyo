import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "../styles/globals.css"
import Navbar from "@/components/Navbar"
import PreFooter from "@/components/PreFooter"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://whiteboxmedia.co.in'),
  title: {
    default: 'WhiteBox Media - Premier Event Management & Digital Marketing Agency',
    template: 'WBM Developed by RelaxKartikey'
  },
  description: 'WhiteBox Media, founded by Neeraj Sharma in 2013, is a leading event management and digital marketing agency in Jaipur, offering comprehensive solutions for corporate events, weddings, and brand promotions.',
  keywords: ['event management', 'digital marketing', 'corporate events', 'wedding planning', 'brand promotion', 'Jaipur', 'WhiteBox Media', 'Neeraj Sharma'],
  authors: [
    { name: 'Neeraj Sharma', url: 'https://whiteboxmedia.co.in' },
  ],
  creator: 'Neeraj Sharma',
  publisher: 'White Box Media Pvt. Ltd.',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'WhiteBox Media - Premier Event Management & Digital Marketing Agency',
    description: 'Leading event management and digital marketing agency in Jaipur, founded by Neeraj Sharma. Offering comprehensive solutions for corporate events, weddings, and brand promotions.',
    url: 'https://whiteboxmedia.co.in',
    siteName: 'WhiteBox Media',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://cdn.whiteboxmedia.co.in/logo.PNG',
        width: 800,
        height: 600,
        alt: 'WhiteBox Media Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhiteBox Media - Premier Event Management Agency',
    description: 'Leading event management and digital marketing agency in Jaipur, founded by Neeraj Sharma',
    images: ['https://cdn.whiteboxmedia.co.in/logo.PNG'],
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
  category: 'Event Management & Digital Marketing',
  classification: 'Business',
  other: {
    'contact:email': 'info@whiteboxmedia.co.in',
    'contact:phone': '+919352057269',
    'contact:address': 'E 31, Forth floor 408 Amar Heights Rani Sati Nagar, Nirman Nagar, DCM Ajmer Road, Near MG Motor, 302019',
    'business:contact_data:street_address': 'E 31, Forth floor 408 Amar Heights',
    'business:contact_data:locality': 'Rani Sati Nagar, Nirman Nagar',
    'business:contact_data:region': 'DCM Ajmer Road',
    'business:contact_data:postal_code': '302019',
    'business:contact_data:country_name': 'India',
    'business:contact_data:email': 'info@whiteboxmedia.co.in',
    'business:contact_data:phone_number': '+919352057269',
    'business:contact_data:website': 'https://whiteboxmedia.co.in',
    'developer': 'RelaxKartikey (https://kartikey.tech)',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-black">
        <Navbar />
        <main>{children}</main>
        <PreFooter />
        <Footer />
      </body>
    </html>
  )
}
