//enum imports
const AnimalTypeEnum = require("./enums/animalTypeEnum");
const AnimalGenderEnum = require("./enums/animalGenderEnum");

//graphql imports
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID
} = graphql;

const AnimalType = new GraphQLObjectType({
  name: "Animal",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLFloat },
    type: { type: AnimalTypeEnum },
    breed: { type: GraphQLString },
    gender: { type: AnimalGenderEnum }
  }),
});

module.exports = AnimalType