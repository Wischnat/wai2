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
const ApolloServer =  require('@apollo/server');
const startStandaloneServer = require('@apollo/server/standalone');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const MyDatabase = require('./mydatabase');

const authors = [
    {
      author_id: 1,
      firstname: 'John',
      lastname: 'Doe',
      age: 25,
    },
];

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])
  
  type Author @key(fields: "author_id") {
    author_id: ID!
    firstname: String
    lastname: String
    age: Int
  }

  type Query {
		authors: [Author]
	}
`;

const resolvers = {
    Query: {
        authors: () => authors
    },
    Author: {
        __resolveReference(author, { getAuthors }) {
            return getAuthors();
          },
    }
}

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

async function start() {
    const db = new MyDatabase({
        client: "pg",
        connection: {
            host: 'api-actor-db',
            user: 'postgres',
            password: 'postgres',
            database: 'author_db',
            debug: true,
        }
      })
    const { url } = await startStandaloneServer.startStandaloneServer(server, {
        listen: { port: 4001 },
        dataSources: {
            authorsAPI: db,
        }
    });
    console.log(`🚀  Server ready at: ${url}`);
};

start();

// const start = async() => {
//     const { url } = await startStandaloneServer(server, {
//         listen: { port: 4001 },
//     });
//     console.log(`🚀  Server ready at: ${url}`);
// };

// start();

