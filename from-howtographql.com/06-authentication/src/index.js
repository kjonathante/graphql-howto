const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
}


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/kjonathante-151c9e/database/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  }),  
})
server.start(() => console.log(`Server is running on http://localhost:4000`))

/*
query {
  info
}

mutation {
  post(
    url: "www.prisma.io"
    description: "Prisma turns your database into a GraphQL API"
  ) {
    id
    url
    description
  }
}

mutation {
  post(
    url: "www.google.com"
    description: "Just Google it."
  ) {
    id
  }
}
query {
  feed{
    id
    description
    url
  }
}

query{
	link(id: "link-1"){
    id
    description
    url
  }  
}

mutation {
  deleteLink(id: "link-1") {
    id
  }
}

mutation {
  updateLink(id: "link-1", url: "www.kit.com") {
    id
  }
}

mutation {
  updateLink(id: "link-1", description: "my description") {
    id
  }
}

query {
  feed {
    id
    url
    description
  }
}
*/