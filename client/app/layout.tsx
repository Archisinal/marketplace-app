import '../styles/globals.css';
import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import { Footer, NavBar } from '@/components';
import { ThemeProvider } from './theme-provider';
import { WalletProvider } from '@/context';

const nunito = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
  weight: ['200', '300', '400', '500', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Marketplace App',
  description: 'Buy and sell items',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.className}>
      <body>
        <ThemeProvider attribute="class">
          <div className="min-h-screen bg-white dark:bg-black-rus xlg:mx-auto xlg:max-w-[1920px]">
            <WalletProvider>
              <NavBar />
              <main className="">{children}</main>
              <Footer />
            </WalletProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
