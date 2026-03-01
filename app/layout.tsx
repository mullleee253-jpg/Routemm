import './globals.css'
import type { Metadata } from 'next'
import DevToolsProtection from '@/components/DevToolsProtection'

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
      </body>
    </html>
  )
}
