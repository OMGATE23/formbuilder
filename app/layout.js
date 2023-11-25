import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FormBuilder',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html  style={{scrollBehavior : 'smooth' , width : '100vw'}} lang="en">
      <body>
        <Providers>{children}</Providers>
        </body>
    </html>
  )
}