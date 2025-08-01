// 📁 app/layout.js (veya layout.tsx)
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CategoriesMenu from "@/components/CategoriesMenu"; // burası client bileşen ama sorun değil

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
       <CategoriesMenu>
          {children}
        </CategoriesMenu>
      </body>
    </html>
  );
}
