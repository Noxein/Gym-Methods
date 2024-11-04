import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BodyColorProvider } from "./components/BodyColorProvider";
import { TempoContextDataProvider } from "./context/TempoContextDataProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:{
    template: "%s | Mordor",
    default: 'Mordor'
  },
  description: "Aplikacja na siłownie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
        <body className={`${inter.className} flex flex-col min-h-screen`}>
            <TempoContextDataProvider>
                {children}
              <BodyColorProvider />
            </TempoContextDataProvider>
        </body>
      

    </html>
  );
}
 