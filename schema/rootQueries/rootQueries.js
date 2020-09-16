//model imports
const announcement = require("../../models/announcement");
const user = require("../../models/user");

//type imports
const AnnouncementType = require("../types/announcementType");
const UserType = require("../types/userType");

//graphql imports
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLFloat,
  GraphQLInt,
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    announcements: {
      type: new GraphQLList(AnnouncementType),
      resolve(parent, args) {
        return announcement.find({});
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return user.find({});
      },
    },
    getAnnouncement: {
      type: AnnouncementType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return announcement.findById(args.id);
      },
    },
    nearAnnouncements: {
      type: new GraphQLList(AnnouncementType),
      args: {
        lat: { type: GraphQLFloat },
        lon: { type: GraphQLFloat },
        dist: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        return announcement.find({
          location: {
            $near: {
              $maxDistance: args.dist == undefined ? 1000 : args.dist,
              $geometry: {
                type: "Point",
                coordinates: [args.lon, args.lat],
              },
            },
          },
        });
      },
    },
    getUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return user.findById(args.id);
      },
    },
    me: {
      type: UserType,
      resolve(parent, args, { userToken }) {
        if (!userToken) {
          throw new Error("Unauthorized Access");
        }
        return user.findById(userToken.id);
      },
    },
  },
});

module.exports = RootQuery;
