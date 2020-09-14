import user from "../../models/user";
import { UserType } from "./userType";
import { AnimalType } from "./animalType";

// export
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLEnumType
} = graphql;

export const AdType = new GraphQLObjectType({
  name: "Ad",
  fields: () => ({
    createdBy: {
      type: UserType, // userType
      resolve(parent, args) {
        return user.findById(parent.createdBy);
      },
    },
    date: { type: GraphQLString },
    type: { type: typeEnum },
    animal: { type: AnimalType }, // animal type
    animalType: { type: animalTypeEnum },
    description: { type: GraphQLString },
    location: {
      type: locationObj,
    }, // location type
    attendant: { type: UserType }, // user type
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
  name: "animalType",
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

const locationObj = new GraphQLObjectType({
  type: {
    type: GraphQLString,
  },
  coordinates: { type: [GraphQLFloat] },
});
