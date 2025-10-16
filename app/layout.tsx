import type React from "react"
import type { Metadata } from "next"
import { Public_Sans, Oswald } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import localFont from "next/font/local"
import ThemeOnScroll from "@/components/theme-on-scroll"
import "./globals.css"

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-serif",
})

const porka = localFont({
  src: "../public/fonts/Porka.ttf",
  variable: "--font-porka",
})

export const metadata: Metadata = {
  title: "DAZE-MEDIA | A Network of Independent Publishers",
  description:
    "DAZE-MEDIA is a one-of-a-kind network of independent publishers, each powering its own distinct culture.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js" strategy="beforeInteractive" />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${publicSans.variable} ${oswald.variable} ${porka.variable} font-sans antialiased`}>
        <ThemeOnScroll percentFromTop={50} minWidth={0} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
