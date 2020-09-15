//model imports
const ad = require("../../models/ad");

//graphql imports
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLFloat
} = graphql;
const GraphQLDate = require('graphql-date')

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
    ads: {
      type: new GraphQLList(require("./adType")),
      resolve(parent, args) {
        return ad.find({ createdBy: parent.id });
      },
    },
  }),
});

module.exports = UserType