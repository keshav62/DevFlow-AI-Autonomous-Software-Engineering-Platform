import './globals.css';
import { Providers } from '@/providers';

export const metadata = {
  title: 'DevFlow AI – Autonomous Software Engineering Platform',
  description: 'AI-powered platform for automated software engineering workflows',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
