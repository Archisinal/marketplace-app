import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import ApolloClientProvider from "../store";
import { MockedProvider } from "@apollo/client/testing";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { GET_DOG_QUERY } from "../pages/index";

const mocks = [
  {
    request: {
      query: GET_DOG_QUERY,
      variables: {
        dogName: "Buck",
      },
    },
    result: {
      data: {
        dog: { id: "1", name: "Buck", breed: "bulldog" },
      },
    },
    delay: 2000,
  },
];
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <ApolloClientProvider>
        <div className="dark:bg-black-rus bg-white min-h-screen">
          <MockedProvider mocks={mocks} addTypename={false}>
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
