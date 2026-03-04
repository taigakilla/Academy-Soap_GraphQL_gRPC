import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./resolvers";

async function main() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Habilita introspection para o GraphQL Playground/Explorer
    introspection: true,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      return {};
    },
  });

  console.log(`🚀 GraphQL Server pronto em: ${url}`);
}

main().catch((err) => {
  console.error("Erro ao iniciar servidor:", err);
  process.exit(1);
});
