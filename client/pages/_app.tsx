import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import ApolloClientProvider from "../store";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <ApolloClientProvider>
        <div className="dark:bg-black-rus bg-white min-h-screen">
          <Component {...pageProps} />
        </div>
      </ApolloClientProvider>
    </ThemeProvider>
  );
};

export default App;
