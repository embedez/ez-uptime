import './globals.css'
import type { Metadata } from 'next'


console.log(process.env.HOST_URL)
export const metadata: Metadata = {
  title: 'Ez Uptime',
  description: 'Edge uptime by the EZ team',
  themeColor: 'black',
  metadataBase: typeof process.env.HOST_URL == "string" ? new URL(process.env.HOST_URL) : undefined,
    twitter: {
      images: `${process.env.HOST_URL}/api/info`,
    }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
            {children}
      </body>
    </html>
  )
}
