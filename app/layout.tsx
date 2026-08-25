import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "HomeShop - Đồ gia dụng thông minh",
  description: "Trang thương mại điện tử đồ gia dụng",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="notranslate" translate="no">
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body>{children}</body>
    </html>
  );
}