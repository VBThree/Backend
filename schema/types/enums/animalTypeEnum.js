//graphql imports
const graphql = require("graphql");
const { GraphQLEnumType } = graphql;

const AnimalTypeEnum = new GraphQLEnumType({
    name: "AnimalTypeEnum",
    values: {
        Cat: { value: "Cat" },
        Dog: { value: "Dog" },
        Other: { value: "Other" },
    },
});

module.exports = AnimalTypeEnum