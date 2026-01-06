import { UserProvider } from "./components/UserProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavTop } from './components/NavTop';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning
      >
        <NavTop/>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
