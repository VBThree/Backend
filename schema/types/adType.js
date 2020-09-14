//model imports
const user = require("../../models/user");

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
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
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
    type: { type: AdTypeEnum },
    animal: { type: AnimalType },
    animalType: { type: AnimalTypeEnum },
    description: { type: GraphQLString },
    location: { type: GraphQLString }, 
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