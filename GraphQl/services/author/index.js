// ! Implementing a subgraph with Apollo Server
// https://www.apollographql.com/docs/apollo-server/using-federation/apollo-subgraph-setup
// ! API Reference: @apollo/subgraph
// https://www.apollographql.com/docs/apollo-server/using-federation/api/apollo-subgraph/
// ! Entities
// https://www.apollographql.com/docs/federation/entities/

// ! Resolver
// https://www.apollographql.com/docs/apollo-server/using-federation/api/apollo-subgraph/#__resolvereference
// ! Data sources
// https://www.apollographql.com/docs/apollo-server/v2/data/data-sources/
// import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
// import gql from 'graphql-tag';
// import { buildSubgraphSchema } from '@apollo/subgraph';
// ! ARGS
// https://www.apollographql.com/tutorials/lift-off-part3/graphql-arguments
const ApolloServer = require("@apollo/server");
const startStandaloneServer = require("@apollo/server/standalone");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { log } = require("console");
const { gql } = require("graphql-tag");
const MyDatabase = require("./mydatabase");

const knexConfig = {
  client: "pg",
  connection: {
    host: "api-author-db",
    user: "postgres",
    password: "postgres",
    database: "author_db",
    debug: true,
  },
};

// const authors = [
//     {
//       author_id: 1,
//       firstname: 'John',
//       lastname: 'Doe',
//       age: 25,
//     },
// ];

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.0"
      import: ["@key", "@shareable"]
    )

  type Query {
    author(author_id: ID!): Author
    authors: [Author]
  }

  type Mutation {
    addAuthor(firstname: String!, lastname: String!, age: Int!): Author
    updateAuthor(
      author_id: ID!
      firstname: String
      lastname: String
      age: Int
    ): Author
    deleteAuthor(author_id: ID!): Author
  }

  type Author @key(fields: "author_id") {
    author_id: ID!
    firstname: String
    lastname: String
    age: Int
  }
`;

// Next, we add a reference resolver for the User entity.
// A reference resolver tells the gateway how to fetch an
// entity by its @key fields:
const resolvers = {
  Query: {
    author: async (_, { author_id }, { dataSources }) => {
      const res = await dataSources.authorsAPI.getAuthorByID(author_id);
      return res[0];
    },
    authors: async (_, __, { dataSources }) => {
      // console.log(dataSources);
      return await dataSources.authorsAPI.getAuthors();
    },
  },
  Mutation: {
    addAuthor: async (_, { firstname, lastname, age }, { dataSources }) => {
      const author = await dataSources.authorsAPI.addAuthor(
        firstname,
        lastname,
        age
      );
      return author[0];
    },
    updateAuthor: async (
      _,
      { author_id, firstname, lastname, age },
      { dataSources }
    ) => {
      const author = await dataSources.authorsAPI.updateAuthor(author_id, {
        firstname,
        lastname,
        age,
      });
      return author[0];
    },
    deleteAuthor: async (_, { author_id }, { dataSources }) => {
      const author = await dataSources.authorsAPI.deleteAuthor(author_id);
      return author[0];
    },
  },
  Author: {
    async __resolveReference({ author_id }, { dataSources }) {
      console.log("AUTHOR QUERY");
      console.log(author_id);
      console.log(dataSources);
      const res = await dataSources.authorsAPI.getAuthorByID(author_id);
      console.log(res);
      return res[0];
    },
  },
};

const server = new ApolloServer.ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

async function start() {
  const { url } = await startStandaloneServer.startStandaloneServer(server, {
    listen: { port: 4001 },
    context: () => ({
      dataSources: {
        authorsAPI: new MyDatabase(knexConfig),
      },
    }),
  });
  console.log(`🚀  Server ready at: ${url}`);
}

start();

// const start = async() => {
//     const { url } = await startStandaloneServer(server, {
//         listen: { port: 4001 },
//     });
//     console.log(`🚀  Server ready at: ${url}`);
// };

// start();
