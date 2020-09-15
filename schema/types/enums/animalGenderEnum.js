//graphql imports
const graphql = require("graphql");
const { GraphQLEnumType } = graphql;

const AnimalGenderEnum = new GraphQLEnumType({
    name: "AnimalGenderEnum",
    values: {
        Female: { value: "Female" },
        Male: { value: "Male" }
    },
});

module.exports = AnimalGenderEnum