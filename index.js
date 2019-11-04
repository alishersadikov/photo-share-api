const { ApolloServer } = require('apollo-server')
const typeDefs = `
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
    category: PhotoCategory!
  }

  # 2. Return Photo from allPhotos
  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  enum PhotoCategory {
    SELFIE
    PORTRAIT
    ACTION
    LANDSCAPE
    GRAPHIC
  }

  input PostPhotoInput {
    name: String!
    category: PhotoCategory=PORTRAIT
    description: String
  }

  # 3. Return the newly posted photo from the mutation
  type Mutation {
    postPhoto(input: PostPhotoInput!): Photo!
  }
`
// 1. A variable that we will increment for unique ids
var _id = 0
var photos = []

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos
  },
  Mutation: {
    postPhoto(parent, args) {
  // 2. Create a new photo, and generate an id
      var newPhoto = {
      id: _id++,
      ...args.input
    }
    photos.push(newPhoto)
    // 3. Return the new photo
    return newPhoto
    }
  },
  Photo: {
    url: parent => `http://yoursite.com/img/${parent.id}.jpg`
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen()
  .then(({url}) => console.log(`GraphQL Service running on ${url}`))
