import './globals.css'
import type { Metadata } from 'next'
import DevToolsProtection from '@/components/DevToolsProtection'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Routeem - Безопасный мессенджер',
  description: 'Защищенный мессенджер с шифрованием',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <DevToolsProtection />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
