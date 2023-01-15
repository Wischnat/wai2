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
const { gql } = require("graphql-tag");
const BookAPI = require("./rest");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.0"
      import: ["@key", "@shareable"]
    )

  type Author @key(fields: "author_id", resolvable: false) {
    author_id: ID!
  }

  type Query {
    book(book_id: ID!): Book
    books: [Book]
  }

  type Mutation {
    addBook(title: String!, author: String!, release_year: Int!): Book
    updateBook(
      book_id: ID!
      title: String
      author: String
      release_year: Int
    ): Book
    deleteBook(book_id: ID!): Book
  }

  type Book @key(fields: "book_id") {
    book_id: ID!
    title: String
    author: Author!
    release_year: Int
  }
`;

// Next, we add a reference resolver for the User entity.
// A reference resolver tells the gateway how to fetch an
// entity by its @key fields:
const resolvers = {
  Query: {
    book: async (_, { book_id }, { dataSources }) => {
      const res = [];
      res.push(await dataSources.booksAPI.getBookByID(book_id));
      console.log(res);
      authorFormatter(res);
      return res[0];
    },
    books: async (_, __, { dataSources }) => {
      const res = await dataSources.booksAPI.getBooks();
      authorFormatter(res);
      return res;
    },
  },
  Mutation: {
    addBook: async (_, { title, author, release_year }, { dataSources }) => {
      const book = [];
      book.push(
        await dataSources.booksAPI.addBook(title, author, release_year)
      );
      authorFormatter(book);
      return book[0];
    },
    updateBook: async (
      _,
      { book_id, title, author, release_year },
      { dataSources }
    ) => {
      const book = [];
      book.push(
        await dataSources.booksAPI.updateBook(book_id, {
          title,
          author,
          release_year,
        })
      );
      authorFormatter(book);
      return book[0];
    },
    deleteBook: async (_, { book_id }, { dataSources }) => {
      const book = [];
      book.push(await dataSources.booksAPI.deleteBook(book_id));
      authorFormatter(book);
      return book[0];
    },
  },
  Book: {
    async __resolveReference({ book_id }, { dataSources }) {
      const book = [];
      book.push(await dataSources.booksAPI.getBookByID(book_id));
      authorFormatter(book);
      return book[0];
    },
  },
};

const server = new ApolloServer.ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

function authorFormatter(res) {
  for (let book of res) {
    const author_id = { author_id: book.author };
    book["author"] = author_id;
  }
}

async function start() {
  const { url } = await startStandaloneServer.startStandaloneServer(server, {
    listen: { port: 4002 },
    context: () => ({
      dataSources: {
        booksAPI: new BookAPI(),
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
