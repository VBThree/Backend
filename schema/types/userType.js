//model imports
const ad = require("../../models/ad");

//graphql imports
const graphql = require("graphql");
const GraphQLDate = require('graphql-date')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLFloat,
  GraphQLInt
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString },
    birthday: { type: GraphQLDate },
    rating: { type: GraphQLFloat },
    publishedCount: {
      type: GraphQLInt,
      async resolve(parent, args) {
        return await ad.find({ createdBy: parent.id }).countDocuments()
      }
    },
    resolvedCount: {
      type: GraphQLInt,
      async resolve(parent, args) {
        return await ad.find({ attendantId: parent.id }).countDocuments()
      }
    },
    ads: {
      type: new GraphQLList(require("./adType")),
      resolve(parent, args) {
        return ad.find({ createdBy: parent.id });
      },
    },
  }),
});

module.exports = UserType