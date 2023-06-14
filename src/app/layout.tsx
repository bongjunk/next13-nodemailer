import './globals.css';

export const metadata = {
  title: 'Bong | nodemailer',
  description:
    'Nextjs + nodemailer + react-hook-form + axios 이용한 local email 전송',
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
