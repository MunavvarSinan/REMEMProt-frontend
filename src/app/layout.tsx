import Navbar from '@/components/ui/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/ui/Footer'
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    <html lang="en">
      <body className={`${inter.className},  min-h-screen`}>

        <div className='p-5'>
          <Navbar />
        </div>
        {children}
        <Analytics />
        <div className='w-full'>
          <Footer />
        </div>
      </body>
    </html >
  )
}
