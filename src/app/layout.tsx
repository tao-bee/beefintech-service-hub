import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BeeFintech Service Hub",
  description: "面向保险科技客户的品牌展示、预约演示和自助服务平台。",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "512x512" }],
    shortcut: [{ url: "/favicon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/favicon.png", type: "image/png", sizes: "512x512" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
