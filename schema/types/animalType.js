//enum imports
const AnimalTypeEnum = require("./enums/animalTypeEnum");

//graphql imports
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} = graphql;

const AnimalType = new GraphQLObjectType({
  name: "Animal",
  fields: () => ({
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    type: { type: AnimalTypeEnum },
    breed: { type: GraphQLString },
  }),
});

module.exports = AnimalType