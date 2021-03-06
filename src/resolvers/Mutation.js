const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.user.create({
        data: {
            ...args,
            password
        }});
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
        token,
        user
    }
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user.findUnique({ where: { email: args.email } });
    if (!user) throw new Error('No such user found');
    
    const isPasswordValid = bcrypt.compare(args.password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
        token,
        user
    }
}

async function postLink(parent, args, context, info) {
    const { userId } = context;

    if (!userId) throw new Error('No userId found');

    const newLink =  await context.prisma.link.create({
            data: { 
            url: args.url,
            description: args.description,
            // connect a user to this new created link, 
            // this will add a field postedBy on the [link table] and the value will be the user object
            postedBy: { connect : {id : userId} } 
            }
    })

    context.pubsub.publish("NEW_LINK", newLink);
    
    return newLink;
}

async function vote(parent, args, context, info) {
    const { userId } = context
    const isVoted = await context.prisma.vote.findUnique({
        where: {
            linkId_userId: {
                linkId: Number(args.linkId),
                userId: userId
            }
        }
    });

    if (Boolean(isVoted)) throw new Error(`Already voted for this link ${args.linkId}`);

    const newVote = await context.prisma.vote.create({
        data: {
            user: { connect: { id: userId } },
            link: { connect: { id: Number(args.linkId)}},
        }
    })

    context.pubsub.publish("NEW_VOTE", newVote);

    return newVote;
}

module.exports = {
    postLink,
    signup,
    login,
    vote,
}