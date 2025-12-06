import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Influenta — Биржа рекламы в Telegram",
  description: "Автоматизированная платформа для блогеров и рекламодателей. Найдите идеального блогера, запустите рекламу за 2 минуты. Прозрачная статистика, встроенный чат, бесплатно.",
  keywords: ["реклама", "блогеры", "telegram", "инфлюенсеры", "маркетинг", "продвижение"],
  authors: [{ name: "YNCHQ" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://influenta.io",
    siteName: "Influenta",
    title: "Influenta — Биржа рекламы в Telegram",
    description: "Топ платформа для блогеров и рекламодателей. Прозрачная статистика, встроенный чат, бесплатно.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Influenta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Influenta — Биржа рекламы в Telegram",
    description: "Топ платформа для блогеров и рекламодателей",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
