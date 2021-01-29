// In depth explanations are found in User.js
function postedBy(parent, args, context, info) {
    return context.prisma.link.findUnique({
        where : {id: parent.id}
    }).postedBy()
}

module.exports = {
    postedBy
}


// This is resolver 