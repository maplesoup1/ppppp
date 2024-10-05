'use client'
import { Poppins } from 'next/font/google'
import "./globals.css";
import Header from '@/components/ui/Header';
import ContactForm from '@/components/ui/ContactForm';
import { useState, useEffect} from 'react';
import { Toaster } from "@/components/ui/toaster"

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showContactForm, setShowContactForm] = useState(false);

  const handleGetInTouchClick = () => {
    setShowContactForm(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    if (showContactForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showContactForm]);

  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins bg-global-background bg-cover bg-center backdrop-blur-15 backdrop-brightness-80 backdrop-contrast-50 z-[-1]">
        <div className="relative z-10">
          <Header onGetInTouchClick={handleGetInTouchClick} />
          {showContactForm && (
            <div className="fixed top-0 left-0 w-full z-50">
              <ContactForm onClose={() => setShowContactForm(false)} />
            </div>
          )}
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
