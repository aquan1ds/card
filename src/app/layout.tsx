import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin", "vietnamese"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: "Blog Website - Tin tức và thông tin hữu ích",
    template: "%s | Blog Website"
  },
  description: "Website blog chia sẻ tin tức, tips và mẹo hữu ích trong cuộc sống. Cập nhật những xu hướng mới nhất và review sản phẩm chất lượng.",
  keywords: ["blog", "tin tức", "tips", "mẹo hay", "review", "công nghệ", "lifestyle"],
  authors: [{ name: "Blog Team" }],
  creator: "Blog Website",
  publisher: "Blog Website",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://yourdomain.com',
    siteName: 'Blog Website',
    title: 'Blog Website - Tin tức và thông tin hữu ích',
    description: 'Website blog chia sẻ tin tức, tips và mẹo hữu ích trong cuộc sống',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog Website',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Website - Tin tức và thông tin hữu ích',
    description: 'Website blog chia sẻ tin tức, tips và mẹo hữu ích trong cuộc sống',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://yourdomain.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
