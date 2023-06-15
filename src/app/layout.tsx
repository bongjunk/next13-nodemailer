import React from 'react';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bong | nodemailer',
  description:
    'Nextjs + nodemailer + react-hook-form + axios 이용한 local email 전송 프로젝트',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
