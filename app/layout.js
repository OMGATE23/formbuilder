import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import {Analytics} from '@vercel/analytics/react'
import Head from 'next/head';
const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] 
})

export const metadata = {
  title: 'FormifyPro',
  description: 'FormifyPro: The user-friendly Next.js form builder. Create dynamic forms anonymously and effortlessly. Customize, share, and collect responses for free. Start crafting your interactive forms now!',
  image : '/cover-image.png'
};


export default function RootLayout({ children }) {
  return (
    <html className={inter.className} style={{scrollBehavior : 'smooth' , width : '100vw'}} lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta property='og:image' content={metadata.image} />
      </Head>
      <body className=''>
        <Providers>{children}</Providers>
        <Analytics/>
      </body>
    </html>
  )
}
