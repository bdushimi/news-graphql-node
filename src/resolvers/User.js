
// Refering to the user type object

// type User {
//     id: ID!
//     name: String!
//     email: String!
//     links: [Link!]!
// }

// [id, name, email] are both root field names and scalar/primitive values
// Since they're scalar values, there is no need to create their resolvers. GraphQL server can easily resolve them.
// However the root field name links is not scalar/primitives therefore GraphQL can not resolve it easily
// Hence the resolver function links. the function name should match the field name

// so where and how does all user object type fields resolved
// In this app, the login mutation is supposed to return the following

// type AuthPayload {
//     token: String
//     user: User
// }

// the login resolver computes the token value and fetches a user object {id, email, name} field resolved immediately
// When it reaches the links field, it calls this function where parent argument is equal to the user object fetched.


function links(parent, args, context, info) {
    // parent object = user object
    return context.prisma.user.findUnique({ 
        where: { 
            id: parent.id
        }
    }).links()
    // Calling links() returns all links the current user owns
    // The function name (links) matches the field name on the User object type.
}

module.exports = {
    links
}