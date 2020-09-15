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

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString },
    birthday: { type: GraphQLString },
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