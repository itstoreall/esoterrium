import type { Metadata } from 'next';
import { PT_Serif, Roboto } from 'next/font/google';
import Providers from '@/src/providers';
import '@/src/sass/globals.scss';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-roboto',
});

const ptSerif = PT_Serif({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-pt-serif',
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
        <body className={`${roboto.variable} ${ptSerif.variable}`}>
          {children}
        </body>
      </Providers>
    </html>
  );
}

/*
import localFont from 'next/font/local';
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
*/
