//model imports
const user = require("../../models/user");
//type imports
const UserType = require("./userType");

//enum imports
const AnnouncementTypeEnum = require("./enums/announcementTypeEnum");
const AnimalSpeciesEnum = require("./enums/animalSpeciesEnum");
const AnimalGenderEnum = require("./enums/animalGenderEnum");
const StatusEnum = require("./enums/statusEnum");

//graphql imports
const graphql = require("graphql");
const { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } = graphql;
const GraphQLDate = require("graphql-date");

const AnnouncementType = new GraphQLObjectType({
  name: "Announcement",
  fields: () => ({
    id: { type: GraphQLID },
    createdBy: {
      type: UserType,
      resolve(parent, args) {
        return user.findById(parent.createdBy);
      },
    },
    date: { type: GraphQLDate },
    type: { type: AnnouncementTypeEnum },
    species: { type: AnimalSpeciesEnum },
    gender: { type: AnimalGenderEnum },
    breed: { type: GraphQLString },
    age: { type: GraphQLFloat },
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
    },
    photo: { type: GraphQLList(GraphQLString) }
  }),
});

module.exports = AnnouncementType;
