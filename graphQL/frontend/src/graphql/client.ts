import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Post: {
        keyFields: ["id"],
      },
      User: {
        keyFields: ["id"],
      },
      Comment: {
        keyFields: ["id"],
      },
    },
  }),
  connectToDevTools: true,
});
