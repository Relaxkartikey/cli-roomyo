import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Read our terms and conditions to understand the rules, guidelines, and policies for using Roomyo's property and Rental Spaces accommodation services.",
  openGraph: {
    title: "Terms & Conditions - Guidelines for Using Roomyo Services",
    description: "Read our terms and conditions to understand the rules, guidelines, and policies for using Roomyo's property and Rental Spaces accommodation services.",
    type: "website",
    url: "https://roomyo.in/terms-conditions",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Roomyo Terms & Conditions',
      },
    ],
  },
  alternates: {
    canonical: "https://roomyo.in/terms-conditions",
  },
};

export default function TermsConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 