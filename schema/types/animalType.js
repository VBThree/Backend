// export
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} = graphql;

export const AnimalType = new GraphQLObjectType({
  name: "Animal",
  fields: () => ({
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    type: { type: animalTypeEnum },
    breed: { type: GraphQLString }, // animal type
  }),
});

const animalTypeEnum = new GraphQLEnumType({
  name: "animalType",
  values: {
    CAT: { value: 0 },
    DOG: { value: 1 },
    OTHER: { value: 2 },
  },
});
