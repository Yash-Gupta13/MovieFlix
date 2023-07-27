import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Movieflix',
  description: 'Movieflix',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className='px-10 pt-5'>
          <Link prefetch href={'/'} className='text-2xl font-semibold '>
            Movie <span className='text-teal-500'>Flix</span>
          </Link>
        </nav>
        {children}
        </body>
    </html>
  )
}
