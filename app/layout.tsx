
import './ui/global.css';
import React from 'react';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body className="font-sans">
        {children}
        </body>
    </html>
  );
}
