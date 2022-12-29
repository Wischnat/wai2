// https://www.apollographql.com/docs/apollo-server/getting-started/
// const ApolloServer =  require('@apollo/server');
// const startStandaloneServer = require('@apollo/server/standalone');
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

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

  type Author {
    author_id: Int
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
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url} and port 4000`);