//model imports
const announcement = require("../../models/announcement");

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
        return await announcement.find({ createdBy: parent.id }).countDocuments()
      }
    },
    resolvedCount: {
      type: GraphQLInt,
      async resolve(parent, args) {
        return await announcement.find({ attendantId: parent.id }).countDocuments()
      }
    },
    announcements: {
      type: new GraphQLList(require("./announcementType")),
      resolve(parent, args) {
        return announcement.find({ createdBy: parent.id });
      },
    },
    resetToken: { type: GraphQLString },
    expiryDate: { type: GraphQLString }
  }),
});

module.exports = UserType