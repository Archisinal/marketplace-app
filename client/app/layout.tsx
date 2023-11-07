import "../styles/globals.css";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { NavBar, Footer, ThemeSwitcher } from "@/components";
import { ThemeProvider } from "./theme-provider";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  weight: ["200", "300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Marketplace App",
  description: "Buy and sell items",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.className}>
      <body>
        <ThemeProvider attribute="class">
          <ThemeSwitcher />
          <div className="dark:bg-black-rus bg-white min-h-screen xlg:max-w-[1920px] xlg:mx-auto">
            <NavBar />
            <main className="">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
