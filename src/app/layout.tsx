import { Poppins } from 'next/font/google'
import "./globals.css";
import Header from '@/components/ui/Header';
import ContactForm from '@/components/ui/ContactForm';

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
      <body className="font-poppins bg-global-background bg-cover bg-center backdrop-blur-15 backdrop-brightness-80 backdrop-contrast-50 z-[-1]">
      <div className="relative z-10">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}