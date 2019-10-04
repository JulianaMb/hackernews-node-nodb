const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: 1,
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => null,
    feed: () => links,
    link: (parent, args) => {
      const link = links.filter(link => {
        return link.id === args.id
      });
      console.log(link);
      return link;
    }
  },
  Mutation: {
      post: (parent, args) => {
          const link = {
              id: `${idCount+1}`,
              description: args.description,
              url: args.url
          };
          links.push(link);
          return link;
      },
      updateLink: (parent, args) => {
        const link = links.filter(link => link.id === args.id);
        const index = links.indexOf(link);
        links[index] = { ...args };
        console.log(links[index]);
        return links[index];
      },
      deleteLink: (parent, args) => {
        const link = links.filter(link => link.id === args.id)[0];
        const index = links.indexOf(link);
        links.splice(index);
        return link;
      }
  }
};

// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
