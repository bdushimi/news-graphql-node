function feed(parent, args, context, info) {
    return context.prisma.link.findMany();
}

function getLink(parent, args, context, info) {
    return context.prisma.link.findUnique({
        where: { id: parseInt(args.id )}
    })
}

module.exports = {
    feed,
    getLink
}