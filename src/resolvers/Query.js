async function feed(parent, args, context, info) {
    const where = args.filter
        ? {
            OR: [
                { description: { contains: args.filter } },
                {url: { contains: args.filter}},
            ]
        
        }
        : {}
    const links = await context.prisma.link.findMany({
        where
    });
    return links;
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