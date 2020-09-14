//graphql imports
const graphql = require("graphql");
const { GraphQLEnumType } = graphql;

const AnimalTypeEnum = new GraphQLEnumType({
    name: "AnimalTypeEnum",
    values: {
        CAT: { value: 0 },
        DOG: { value: 1 },
        OTHER: { value: 2 },
    },
});

module.exports = AnimalTypeEnum