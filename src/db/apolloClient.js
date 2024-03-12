import { ApolloClient, InMemoryCache } from "@apollo/client";

let apolloClient;

const getApolloClient = () => {
  if (apolloClient == null){
    apolloClient = new ApolloClient({
      uri: "http://localhost:3000/api/graphql",
      cache: new InMemoryCache(),
    });
  }
  return apolloClient
};

export default getApolloClient;