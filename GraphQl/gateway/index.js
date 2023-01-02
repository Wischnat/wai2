'use strict';
const { ApolloServer } = require('@apollo/server');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');
const { startStandaloneServer } = require('@apollo/server/standalone');
// https://www.apollographql.com/docs/apollo-server/getting-started/
// https://www.apollographql.com/docs/apollo-server/using-federation/api/apollo-subgraph/
// https://www.apollographql.com/docs/apollo-server/using-federation/apollo-gateway-setup
// https://www.apollographql.com/docs/apollo-server/using-federation/api/apollo-gateway/
// https://www.apollographql.com/docs/federation/federated-types/overview/#supergraph-schema
// https://www.apollographql.com/docs/federation/federated-types/composition/
// https://www.apollographql.com/docs/federation/quickstart/local-subgraphs

// * 1. Supergraph schema & Subgraph schema & API schema
// *https://www.apollographql.com/docs/federation/federated-types/overview/#supergraph-schema
// * Important for point 2
// *The supergraph schema is the output of schema composition
// * TODO create supergraph schema (supergraph.graphql)

// * 1.1 Schema composition!
// * https://www.apollographql.com/docs/federation/federated-types/composition/
// * rover supergraph compose --config ./supergraph-config.yaml
// * ! 1.2 Manually with the Rover CLI
// * https://www.apollographql.com/docs/federation/quickstart/setup/#install-the-rover-cli
// *Part 1 - Project setup & Part 3 - Local composition

// ! 2. Implementing a gateway with Apollo Server
// ! API Reference
// https://www.apollographql.com/docs/apollo-server/using-federation/api/apollo-gateway/
// ! Implementing and Examples
// https://www.apollographql.com/docs/apollo-server/using-federation/apollo-gateway-setup
// * TODO Implement -> const supergraphSdl = readFileSync('./supergraph.graphql').toString();
// * TODO const gateway = new ApolloGateway({
// * TODO  supergraphSdl,
// * TODO  });
// Name
// You can specify any string value for name, which is used primarily for query planner output,
// error messages, and logging.

// ! Implementing a subgraph with Apollo Server
// https://www.apollographql.com/docs/apollo-server/using-federation/apollo-subgraph-setup
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'author', url: 'http://api-author:4001' },
      { name: 'book', url: 'http://api-book:4002' },
    ],
  }),
});

(async () => {
  const server = new ApolloServer({
    gateway,
    engine: false,
    subscriptions: false,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
})();