import type { Metadata } from "next";

import "~/styles/globals.scss";
import SideBar from "~/app/common/components/layouts/SideBar";

export const metadata: Metadata = {
  title: "Strimy",
  description:
    "Strimy is a streaming platform that allows you to watch movies and TV series online.",
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
