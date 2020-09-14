const graphql = require("graphql");
const ad = require("../../models/ad");
const animal = require("../../models/animal");
const user = require("../../models/user");
const AdType = require("../types/adType");
const UserType = require("../types/userType");
const {
  GraphQLObjectType,
  GraphQLList
} = graphql;

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
        type: new GraphQLList(AdType),
        resolve(parent, args) {
          return animal.find({})
        }
      },
    }
})

module.exports = RootQuery