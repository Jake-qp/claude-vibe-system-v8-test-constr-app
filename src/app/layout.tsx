import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CrewBoard - Construction Project Management',
  description: 'Simple project management for your construction business',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1 pb-20 md:pb-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
