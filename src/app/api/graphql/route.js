import { startServerAndCreateNextHandler } from "@as-integrations/next"; // !IMPORTANT needed for backend graphql + nextjs
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import typeDefs from "./typedefs";
import resolvers from "./resolvers";
import { initDB } from "@/db/init";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

initDB();

const server = new ApolloServer({
  resolvers,
  typeDefs,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({
    req,
    res,
  }),
});

export async function GET(request) {
  return handler(request);
}
export async function POST(request) {
  return handler(request);
}