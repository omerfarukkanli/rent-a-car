import './globals.css';
import type { Metadata } from 'next';
import ReduxProvaider from '@/provaiders/redux.provaider';
import AuthGuard from '@/provaiders/auth.provaider';

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
      <body>
        <ReduxProvaider>
          <AuthGuard>
            <main>{children}</main>
          </AuthGuard>
        </ReduxProvaider>
      </body>
    </html>
  );
}
