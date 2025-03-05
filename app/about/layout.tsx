import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | WhiteBoxMedia",
  description: "Learn about WhiteBoxMedia, our founder, and our commitment to excellence in event management and digital marketing services.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 