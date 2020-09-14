const user = require("../../models/user");
const UserType = require("./userType")
const AnimalType = require("./animalType")

// export
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLEnumType
} = graphql;

const AdType = new GraphQLObjectType({
  name: "Ad",
  fields: () => ({
    createdBy: {
      type: UserType,
      resolve(parent, args) {
        return user.findById(parent.createdBy);
      },
    },
    date: { type: GraphQLString },
    type: { type: typeEnum },
    animal: { type: AnimalType },
    animalType: { type: animalTypeEnum },
    description: { type: GraphQLString },
    location: { type: GraphQLString }, 
    attendant: { 
      type: UserType,
      resolve(parent, args) {
        return user.findById(parent.attendantId);
      }
     },
    status: { type: statusEnum },
  }),
});

const typeEnum = new GraphQLEnumType({
  name: "type",
  values: {
    LOST: { value: 0 },
    FOOD: { value: 1 },
    OWNERSHIP: { value: 2 },
    VACCINATION: { value: 3 },
  },
});

const animalTypeEnum = new GraphQLEnumType({
  name: "animalTypeEnum",
  values: {
    CAT: { value: 0 },
    DOG: { value: 1 },
    OTHER: { value: 2 },
  },
});

const statusEnum = new GraphQLEnumType({
  name: "status",
  values: {
    ACTIVE: { value: 0 },
    IN_PROGRESS: { value: 1 },
    DONE: { value: 2 },
  },
});

// const locationObj = new GraphQLObjectType({
//   name:"locationType",
//   fields: () => ({
//     type: { type: GraphQLString },
//     coordinates: { type: [GraphQLFloat] },
//   })
// });

module.exports = AdType