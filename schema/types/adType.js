//model imports
const user = require("../../models/user");
const animal = require("../../models/animal");
//type imports
const UserType = require("./userType")
const AnimalType = require("./animalType")

//enum imports
const AdTypeEnum = require("./enums/adTypeEnum")
const AnimalTypeEnum = require("./enums/animalTypeEnum")
const StatusEnum = require("./enums/statusEnum")

//graphql imports
const graphql = require("graphql");
const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
} = graphql;
const GraphQLDate = require('graphql-date')

const AdType = new GraphQLObjectType({
  name: "Ad",
  fields: () => ({
    id: { type: GraphQLID },
    createdBy: {
      type: UserType,
      resolve(parent, args) {
        return user.findById(parent.createdBy);
      },
    },
    date: { type: GraphQLDate },
    type: { type: AdTypeEnum },
    animal: { 
      type: AnimalType,
      resolve(parent, args) {
        return animal.findById(parent.animalId);
      } 
    },
    animalType: { type: AnimalTypeEnum },
    description: { type: GraphQLString },
    coordinates: { type: GraphQLString }, 
    status: { type: StatusEnum },
    attendant: {
      type: UserType,
      resolve(parent, args) {
        return user.findById(parent.attendantId);
      }
    },
  }),
});

// const locationObj = new GraphQLObjectType({
//   name:"locationType",
//   fields: () => ({
//     type: { type: GraphQLString },
//     coordinates: { type: [GraphQLFloat] },
//   })
// });

module.exports = AdType