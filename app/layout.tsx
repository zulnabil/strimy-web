import type { Metadata } from "next";

import "~/styles/globals.scss";
import SideBar from "~/app/common/components/layouts/SideBar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="theme-dark">
        <SideBar />
        {children}
      </body>
    </html>
  );
}
