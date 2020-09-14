import ad from "../../models/ad";
import { AdType } from "./adType";

// export
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = graphql;

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString },
    rating: { type: graphql.GraphQLFloat },
    ads: {
      type: new GraphQLList(AdType), // addType
      resolve(parent, args) {
        return ad.find({ createdBy: parent.id });
      },
    },
  }),
});
