import React, { FC } from "react";
import { useTheme } from "next-themes";
import NavBar from "../components/NavBar";
import { Footer } from "../components/index";

type TLayout = {
  children: React.ReactNode;
};

export default function Layout({ children }: TLayout) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? "DARK" : "LIGHT"}
      </button>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
