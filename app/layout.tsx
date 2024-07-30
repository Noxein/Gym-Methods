import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeContextProvider } from "./context/ThemeContext";
import { ClassMaker } from "./ui/icons/ClassMaker";
import { BodyColorProvider } from "./components/BodyColorProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
        <body className={`${inter.className} flex flex-col min-h-screen`}>
          <ThemeContextProvider>
            {children}
            <BodyColorProvider />
          </ThemeContextProvider>
        </body>
      

    </html>
  );
}
