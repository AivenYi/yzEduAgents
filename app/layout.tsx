import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { NavBar } from '@/components/nav-bar'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Education Platform",
  description: "Your AI Education Assistant",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-800">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  )
}

