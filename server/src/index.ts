require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
const xlsx = require("node-xlsx");
import { File } from "./entity/file.model";
import { getRepository } from "typeorm";

const workSheetsFromFile = xlsx.parse(`${__dirname}/test.xlsx`);

const typeDefs = gql`
  type File {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    uploads: [File]
    file(id: ID!): File
  }

  type Mutation {
    singleUpload(file: Upload!): File!
  }
`;

const resolvers = {
  Query: {
    uploads: (_: any, { id }: { id: string }) =>
      File.getRepository().findOne({ where: { id: Number(id) } }),
  },
  Mutation: {
    singleUpload: (
      _: any,
      args: {
        file: {
          filename: string;
          mimetype: string;
          encoding: string;
        };
      }
    ): any => {
      console.log();
      return null;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(process.env.PORT, () => {
  console.log(`Server ready at ${process.env.PORT}`);
});
