import { poppins } from './ui/fonts';
import './ui/global.css';
import React from 'react';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body className={` ${poppins.className} antialiased`}>
        {children}
        </body>
    </html>
  );
}
