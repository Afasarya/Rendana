import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { quicksand } from '@/styles/fonts';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Estimasi Modal Bisnis & Balik Modal',
  description: 'Kalkulator untuk membantu perencanaan modal bisnis dan estimasi balik modal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={quicksand.variable}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}