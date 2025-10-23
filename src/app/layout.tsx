import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ClientLayout from "@/components/ClientLayout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins bg-global-background bg-cover bg-center bg-fixed">
        <div className="fixed inset-0 -z-10 backdrop-blur-15 backdrop-brightness-80 backdrop-contrast-50 pointer-events-none" />
        <div className="relative z-10">
          <ClientLayout>{children}</ClientLayout>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
