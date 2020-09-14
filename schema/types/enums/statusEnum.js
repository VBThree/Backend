//graphql imports
const graphql = require("graphql");
const { GraphQLEnumType } = graphql;

const StatusEnum = new GraphQLEnumType({
    name: "StatusEnum",
    values: {
        Active: { value: "Active" },
        inProgress: { value: "inProgress" },
        Done: { value: "Done" },
    },
});

module.exports = StatusEnum