//graphql imports
const graphql = require("graphql");
const { GraphQLEnumType } = graphql;

const AdTypeEnum = new GraphQLEnumType({
    name: "AdTypeEnum",
    values: {
        LOST: { value: 0 },
        FOOD: { value: 1 },
        OWNERSHIP: { value: 2 },
        VACCINATION: { value: 3 },
    },
});

module.exports = AdTypeEnum