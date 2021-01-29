// In depth explanations are found in User.js
function postedBy(parent, args, context, info) {
    // parent object = fetched link
    return context.prisma.link.findUnique({
        where : {id: parent.id}
    }).postedBy()
    // The function postedBy was made available to both Link model & type
    // It finds user(s) who posted the link with id = parent.id
}


function votes(parent, args, context, info) {
    return context.prisma.link.findUnique({
        where: { id: parent.id }
    }).votes(); // returns votes of the link i.e. link with id = parent.id
}

module.exports = {
    postedBy,
    votes,

}

