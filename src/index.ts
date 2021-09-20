import 'reflect-metadata';
import express from 'express';
import './database/connection';
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { UserResolver } from './modules/user/UserResolver';

const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver]
  });


  const apolloServer = new ApolloServer({
    schema,
  });

  await apolloServer.start();

  const app = express();

  apolloServer.applyMiddleware({ app });

  app.listen(3030, () => console.log(`Server running at port 3030`));
}

main();

