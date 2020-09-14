//model imports
const ad = require("../../models/ad");
const animal = require("../../models/animal");
const user = require("../../models/user");

//type imports
const AdType = require("../types/adType");
const AnimalType = require("../types/animalType");
const UserType = require("../types/userType");

//graphql imports
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList } = graphql;

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
      ads: {
        type: new GraphQLList(AdType),
        resolve(parent, args) {
          return ad.find({})
        }
      },
      users: {
        type: new GraphQLList(UserType),
        resolve(parent, args) {
          return user.find({})
        }
      },
      animals: {
        type: new GraphQLList(AnimalType),
        resolve(parent, args) {
          return animal.find({})
        }
      },
    }
})

module.exports = RootQuery