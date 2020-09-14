const graphql = require("graphql");
const user = require("../../models/user");
const AdType = require("../types/adType");
const UserType = require("../types/userType");
const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLFloat
} = graphql;

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
      addUser: {
        type: UserType,
        args: {
          name: { type: GraphQLString },
          email: { type: GraphQLString },
          phone: { type: GraphQLString },
          password: { type: GraphQLString },
          rating: { type: GraphQLFloat },
        },
        resolve(parent, args) {
          
          let _user = new user({
            name: args.name,
            email: args.email,
            phone: args.phone,
            password: args.password,
            rating: args.rating
          })
          return _user.save()
        }
      },
      addAd: {
        type: AdType,
        args:{
          
        }
      } 
    }
})

module.exports = Mutation;