//model imports
const ad = require("../../models/ad");
const user = require("../../models/user");
const animal = require("../../models/animal");

//type imports
const AdType = require("../types/adType");
const UserType = require("../types/userType");
const AnimalType = require("../types/animalType");

//enum imports
const AdTypeEnum = require("../types/enums/adTypeEnum")
const AnimalTypeEnum = require("../types/enums/animalTypeEnum")
const StatusEnum = require("../types/enums/statusEnum")
const AnimalGenderEnum = require("../types/enums/animalGenderEnum");

//graphql imports
const graphql = require("graphql");
const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLID,
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
          createdBy: { type: GraphQLID },
          date: { type: GraphQLString },
          type: { type: AdTypeEnum },
          animalId: { type: GraphQLID },
          animalType: { type: AnimalTypeEnum },
          description: { type: GraphQLString },
          coordinates: { type: GraphQLString },
          attendantId: { type: GraphQLID },
          status: { type: StatusEnum }
        },
        resolve(parent, args) {
          let _ad = new ad({
            createdBy: args.createdBy,
            date: args.date,
            type: args.type,
            animalId: args.animalId,
            animalType: args.animalType,
            description: args.description,
            coordinates: args.coordinates,
            attendantId: args.attendantId,
            status: args.status
          })
          return _ad.save()
        }
      },
      addAnimal: {
        type: AnimalType,
        args: {
          name: {type: GraphQLString },
          age: {type: GraphQLFloat },
          type: {type: AnimalTypeEnum },
          breed: {type: GraphQLString },
          gender: {type: AnimalGenderEnum }
        },
        resolve(parent, args) {
          let _animal = new animal({
            name: args.name,
            age: args.age,
            type: args.type,
            breed: args.breed,
            gender: args.gender
          })
          return _animal.save()
        }
      },
    }
})


module.exports = Mutation;