import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FormifyPro',
  description: 'FormifyPro: The user-friendly Next.js form builder. Create dynamic forms anonymously and effortlessly. Customize, share, and collect responses for free. Start crafting your interactive forms now!',
};


export default function RootLayout({ children }) {
  return (
    <html  style={{scrollBehavior : 'smooth' , width : '100vw'}} lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>
        <Providers>{children}</Providers>
        </body>
    </html>
  )
}
