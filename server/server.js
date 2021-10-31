const express = require('express');
const {ApolloServer} = require('apollo-server-express')
const {typeDefs, resolvers} = require('./schemas')
const path = require('path');
const db = require('./config/connection');
//const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;


    // create a new Apollo server and pass in our schema data
    const server = new ApolloServer({
      typeDefs,
      resolvers,
     // context:authMiddleware
    })
      // Start the Apollo server
  // server.start();

   // integrate our Apollo server with the Express application as middleware
   server.applyMiddleware({app})

    // log where we can go to test our GQL API



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});
