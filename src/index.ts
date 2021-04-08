import "reflect-metadata";
import Fastify, { FastifyInstance } from "fastify";
import mercurius from "mercurius";

import { UserResolver } from "./resolvers/User";
import { buildSchema } from "type-graphql";

import { buildContext } from "./context";

async function main() {
  const app: FastifyInstance = Fastify();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    validate: false,
  });

  app.register(mercurius, {
    schema,
    context: buildContext,
    graphiql: true,
  });

  app
    .listen(3000)
    .then(() =>
      console.log(`🚀 Server ready at http://localhost:3000/graphiql`)
    );
}

main().catch(console.error);
