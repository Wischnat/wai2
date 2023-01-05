const { Client } = require('pg');

module.exports.getClient = async () => {
    const client = new Client({
        host: 'api-actor-db',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'author_db',
        ssl: false,
      });
    await client.connect();
    return client;
  };





