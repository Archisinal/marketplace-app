import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => {
  const client = new ApolloClient({
    // TODO: set BE uri
    uri: "https://flyby-router-demo.herokuapp.com/",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
