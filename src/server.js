import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { athenticateJwt } from "./passport";
import { prisma } from "../generated/prisma-client";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});

server.express.use(logger("dev"));
server.express.use(athenticateJwt);

server.start({ port: PORT }, () => {
  console.log(`✅ Server running on  http://localhost:${PORT}`);
});
