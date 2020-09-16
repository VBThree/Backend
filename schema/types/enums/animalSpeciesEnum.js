//graphql imports
const graphql = require("graphql");
const { GraphQLEnumType } = graphql;

const AnimalSpeciesEnum = new GraphQLEnumType({
    name: "AnimalSpeciesEnum",
    values: {
        Cat: { value: "Cat" },
        Dog: { value: "Dog" },
        Other: { value: "Other" },
    },
});

module.exports = AnimalSpeciesEnum