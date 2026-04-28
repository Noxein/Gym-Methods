import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BodyColorProvider } from "./components/BodyColorProvider";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getUserLocale } from "./i18n/locale";
import { LocaleProvider } from "./context/LocaleContext";
import { SessionProvider } from "next-auth/react";

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
  const locale = await getUserLocale()
  const messages = await getMessages();

  return (
    <html lang={locale}> 
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <SessionProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <LocaleProvider lang={locale}>       
              {children}
              <BodyColorProvider />
            </LocaleProvider>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
 