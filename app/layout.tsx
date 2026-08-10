import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { SmoothScrolling } from '@/components/smooth-scrolling'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Muhammad Pandji Ar Rizky Munib — Portfolio',
  description:
    'Siswa SMK Telkom Sidoarjo (2024 - 2028). Portfolio dan karya Muhammad Pandji Ar Rizky Munib dalam bidang pengembangan perangkat lunak dan teknologi.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/images/logo-porto.png' },
      { url: '/app/icon.png', type: 'image/png' },
    ],
    shortcut: ['/images/logo-porto.png'],
    apple: [
      { url: '/images/logo-porto.png' },
    ],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#241f1c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
