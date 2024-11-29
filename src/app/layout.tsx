import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Providers from '@/src/providers';
import FacebookSDKLoader from '../components/Layout/FacebookSDKLoader';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: 'Esoterrium',
  description: 'Esoterrium - Духовное саморазвитие',
  icons: { icon: '/favicon.png' },
};

export type ChildrenProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<ChildrenProps>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>

      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <FacebookSDKLoader />
          {children}
        </body>
      </Providers>
    </html>
  );
}
