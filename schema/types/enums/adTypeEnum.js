//graphql imports
const graphql = require("graphql");
const { GraphQLEnumType } = graphql;

const AdTypeEnum = new GraphQLEnumType({
    name: "AdTypeEnum",
    values: {
        Lost: { value: "Lost" },
        Food: { value: "Food" },
        Ownership: { value: "Ownership" },
        Vaccination: { value: "Vaccination" },
    },
});

module.exports = AdTypeEnum