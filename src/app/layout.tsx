import './globals.css';
import type { Metadata } from 'next';
import ReduxProvaider from '@/provaiders/redux.provaider';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Created with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='min-h-screen bg-white dark:bg-gray-900'>
        <ReduxProvaider>
          <main>{children}</main>
        </ReduxProvaider>
      </body>
    </html>
  );
}
