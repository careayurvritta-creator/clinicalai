import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clinical AI - AyurVritta Ayurveda",
  description: "AI-powered Ayurved clinical assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
