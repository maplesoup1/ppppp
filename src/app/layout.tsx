import { Poppins } from 'next/font/google'
import "./globals.css";
import Header from '@/components/ui/Header';
import Head from 'next/head';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins background-image-blur-whitewash-backdrop">
        <Header/>
        {children}
      </body>
    </html>
  );
}