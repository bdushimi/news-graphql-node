
// New link event to subscribe to/ publish
function newLinkSubscription(parent, args, context, info) {
    return context.pubsub.asyncIterator("NEW_LINK")
}


const newLink = {
    subscribe: newLinkSubscription,
    resolve: payload => {
        return payload
    }
}

function newVoteSubscribe(parent, args, context, info) {
    return context.pubsub.asyncIterator("NEW_VOTE")
}

const newVote = {
    subscribe: newVoteSubscribe,
    resolve: payload => {
        return payload
    },
}

module.exports = {
    newLink,
    newVote,
}