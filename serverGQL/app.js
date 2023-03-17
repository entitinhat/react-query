const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const app = express();
server.start().then(() => {
    server.applyMiddleware({ app });

    app.listen({ port: 3333 }, () => {
        console.log(`server is at http://localhost:3333${server.graphqlPath}`);
    });
});
