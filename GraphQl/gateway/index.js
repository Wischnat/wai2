'use strict';
const { ApolloServer } = require('@apollo/server');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');
const { startStandaloneServer } = require('@apollo/server/standalone');


//https://www.apollographql.com/docs/apollo-server/using-federation/apollo-gateway-setup
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'author', url: 'http://api-author:4001' },
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