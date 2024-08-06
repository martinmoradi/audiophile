import "~/styles/globals.css";

import { Manrope as FontSans } from "next/font/google";
import { type Metadata } from "next";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";

export const metadata: Metadata = {
  title: "Audiophile",
  description: "Audiophile e-commerce website",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <html lang="en" className={fontSans.variable}>
      <body className="antialiased">
        <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
          <Header />
          <main>
            {children}
            {modal}
            <div id="modal-root" />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
