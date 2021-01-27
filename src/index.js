const { ApolloServer } = require('apollo-server');


// Defining a schema using SDL (Schema Definition Language)
// Every GraphQL schema has three special root types: Query, Mutation, and Subscription
// Link is an Object Type, that represents the links that can be posted to News
const typeDefs = `
    
    type Query {
        info: String!
        feed: [Link!]!
    }

    type Link {
        id: ID!
        description: String!
        url: String!
    }

`


let links = [
    {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
    },
    {
        id: 'link-1',
        url: 'www.jw.org',
        description: 'Official Website of Jehoave\'s witnesses '
    }
]

// Actual implementation of the GraphQL schema
// Each root field needs an implementation
const resolvers = {
    Query: {
        info: () => `This is the API of News clone`,
        feed: () => links,
    },

    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
};


const server = new ApolloServer({
    typeDefs,
    resolvers
});


server
    .listen()
    .then(({ url }) => {
        console.log(`Server is running on ${url}`)
    });


