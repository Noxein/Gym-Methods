import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BodyColorProvider } from "./components/BodyColorProvider";
import { LocaleDataProvider } from "./context/LocaleDataProvider";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:{
    template: "%s | Mordor",
    default: 'Mordor'
  },
  description: "Aplikacja na siłownie",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      
        <body className={`${inter.className} flex flex-col min-h-screen`}>
          <NextIntlClientProvider messages={messages}>
            <LocaleDataProvider>
                {children}
              <BodyColorProvider />
            </LocaleDataProvider>
          </NextIntlClientProvider>
        </body>
      

    </html>
  );
}
 