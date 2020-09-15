//model imports
const user = require("../../models/user");
const animal = require("../../models/animal");
//type imports
const UserType = require("./userType");
const AnimalType = require("./animalType");

//enum imports
const AdTypeEnum = require("./enums/adTypeEnum");
const AnimalTypeEnum = require("./enums/animalTypeEnum");
const StatusEnum = require("./enums/statusEnum");

//graphql imports
const graphql = require("graphql");
const { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } = graphql;

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
    date: { type: GraphQLString },
    type: { type: AdTypeEnum },
    animal: {
      type: AnimalType,
      resolve(parent, args) {
        return animal.findById(parent.animalId);
      },
    },
    animalType: { type: AnimalTypeEnum },
    description: { type: GraphQLString },
    status: { type: StatusEnum },
    attendant: {
      type: UserType,
      resolve(parent, args) {
        return user.findById(parent.attendantId);
      },
    },
    coordinates: {
      type: GraphQLList(GraphQLFloat),
      resolve(parent, args){
        return parent.location.coordinates;
      }
    }
  }),
});

module.exports = AdType;
