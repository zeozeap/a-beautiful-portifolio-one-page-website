import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Portfolio - Liquid Digital Magic ✨",
  description:
    "A stunning iPhone-inspired liquid glass portfolio showcasing creative work and digital experiences with magical interactions",
  generator: "v0.app",
  keywords: ["portfolio", "web developer", "liquid glass", "iPhone design", "digital experiences"],
  authors: [{ name: "Portfolio Developer" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`} suppressHydrationWarning>
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  )
}
