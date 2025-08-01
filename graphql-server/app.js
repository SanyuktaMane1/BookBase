import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./db.js";
import typeDefs from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";
import { getUserFromToken } from "./utils/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());
  app.use(bodyParser.json());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        const user = getUserFromToken(token);
        return { user };
      },
    })
  );

  app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}/graphql`);
  });
};

startServer();
