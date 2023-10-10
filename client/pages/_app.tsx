import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import ApolloClientProvider from "../store";
import { MockedProvider } from "@apollo/client/testing";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { responseMocks } from "../mockData/queryMock";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <ApolloClientProvider>
        <div className="dark:bg-black-rus bg-white min-h-screen">
          <MockedProvider mocks={responseMocks} addTypename={false}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MockedProvider>
        </div>
      </ApolloClientProvider>
    </ThemeProvider>
  );
};

export default App;
