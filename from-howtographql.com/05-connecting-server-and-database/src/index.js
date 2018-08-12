const { GraphQLServer } = require('graphql-yoga')


let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: function() { 
      return links 
    },
    link: function(root, args) {
      // console.log(arguments)
      for (let val of links) {
        //console.log(val)
        if (val.id==args.id)
          return val
      }
    },
  },
  Mutation: {
    post: function(root, args) {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: function(root, args) {
      for (let val of links) {
        //console.log(val)
        if (val.id==args.id) {
          val.url = args.url || val.url
          val.description = args.description || val.description
          return val
        }
      }
    },
    deleteLink: function(root, args) {
      for (let i in links) {
        if (links[i].id==args.id) {
          idCount--;
          return links.splice(i,1)[0]
        }
      }
    },
  },
  // Link resolvers are not needed because the GraphQL server infers what they look like.
  // Link: {
  //   id: (root) => root.id,
  //   description: (root) => root.description,
  //   url: (root) => root.url,
  // },
}


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
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