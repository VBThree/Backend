//graphql imports
const graphql = require("graphql");
const { GraphQLEnumType } = graphql;

const StatusEnum = new GraphQLEnumType({
    name: "StatusEnum",
    values: {
        ACTIVE: { value: 0 },
        IN_PROGRESS: { value: 1 },
        DONE: { value: 2 },
    },
});

module.exports = StatusEnum