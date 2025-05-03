import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Use a standard Google Font
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

// Instantiate the Inter font
const inter = Inter({
  variable: '--font-inter', // Define a CSS variable for the font
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LitLink - Your Modern Bookstore',
  description: 'Buy physical and digital books online. Explore genres, authors, and community discussions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Apply the font variable to the body */}
      <body className={`${inter.variable} antialiased flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
