
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HRM System | Quản lý nhân sự",
  description:
    "Hệ thống quản lý nhân sự, chấm công, ca làm việc và nghỉ phép.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
