// 1. Require 'apollo-server'
const { ApolloServer } = require('apollo-server')
const typeDefs = `
  type Query {
    totalPhotos: Int!
  }
`
const resolvers = {
  Query: {
    totalPhotos: () => 42
  }
}
// 2. Create a new instance of the server.
// 3. Send it an object with typeDefs (the schema) and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers
})
// 4. Call listen on the server to launch the web server
server
  .listen()
  .then(({url}) => console.log(`GraphQL Service running on ${url}`))
