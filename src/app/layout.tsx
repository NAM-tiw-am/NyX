import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import TopHeader from '@/components/layout/TopHeader';
import MobileNav from '@/components/layout/MobileNav';
import AddTransactionModal from '@/components/layout/AddTransactionModal';
import CustomCursor from '@/components/CustomCursor';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'OVERCLOCK — Gamified Personal Finance Manager',
  description: 'Conquer your capital with OVERCLOCK — high intensity brutalist gamified expense and budget manager.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="bg-[#131313] text-[#e2e2e2] antialiased selection:bg-[#cb2957] selection:text-white min-h-screen flex flex-col font-inter">
        <CustomCursor />
        <TopHeader />
        <Sidebar />
        <AddTransactionModal />

        <div className="flex-1 flex flex-col">
          <PageTransition>{children}</PageTransition>
        </div>

        <MobileNav />
      </body>
    </html>
  );
}
