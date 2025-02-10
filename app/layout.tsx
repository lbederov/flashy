import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My interview flash cards",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-base-200 font-sans" data-theme="light">
      <body>
        {children}
      </body>
    </html>
  );
}
