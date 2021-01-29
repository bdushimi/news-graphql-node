const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client')
const { getUserId } = require('./utils');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Link = require('./resolvers/Link');
const User = require('./resolvers/User');

const fs = require('fs');
const path = require('path');


const prisma = new PrismaClient();

// Defining a schema using SDLs (Schema Definition Language)
// Every GraphQL schema has three special root types: Query, Mutation, and Subscription
// Link is an Object Type, that represents the links that can be posted to News
let links = [
    {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
    },
    {
        id: 'link-1',
        url: 'www.jw.org',
        description: 'Official Website of Jehoave\'s witnesses'
    }
]


let idCount = links.length;
// Actual implementation of the GraphQL schema
// Each root field needs an implementation

// Before
// const resolvers = {
//     Query: {
//         info: () => `This is the API of News clone`,
//         feed: (parent, args, context) => {
//             return context.prisma.link.findMany();
//         },
//         getLink: (parent, args) => {
//             const linkArray = links.filter((link) => link.id === args.id)
//             if(linkArray.length != 0){
//                 return linkArray[0]
//             }else {
//                 return null;
//             }
//         }
//     },
//     Mutation: {
//         postLink : (parent, args, context) => {
//             const newLink = context.prisma.link.create({
//                 data: {
//                     url: args.url,
//                     description: args.description,
//                 },
//             })
//             return newLink
//         },

//         updateLink: (parent, args) => {
//             return links
//             .filter((link) => link.id === args.id)
//             .map((link) => {
//                 if(args.url){
//                     link.url = args.url
//                 }

//                 if (args.description){
//                     link.description = args.description
//                 }

//                 return link
//             })[0];
//         }
//     }
// };


const resolvers = {
    Query,
    Mutation,
    Link,
    User
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
      ),
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            userId: req && req.headers.authorization ? getUserId(req) : null
        };
    }
});


server
    .listen()
    .then(({ url }) => {
        console.log(`Server is running on ${url}`)
    });


