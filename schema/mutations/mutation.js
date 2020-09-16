//model imports
const ad = require("../../models/ad");
const user = require("../../models/user");
const animal = require("../../models/animal");

//type imports
const AdType = require("../types/adType");
const UserType = require("../types/userType");
const AnimalType = require("../types/animalType");

//enum imports
const AdTypeEnum = require("../types/enums/adTypeEnum");
const AnimalTypeEnum = require("../types/enums/animalTypeEnum");
const StatusEnum = require("../types/enums/statusEnum");
const AnimalGenderEnum = require("../types/enums/animalGenderEnum");

//graphql imports
const graphql = require("graphql");
const { GraphQLString, GraphQLObjectType, GraphQLList, GraphQLFloat, GraphQLID } = graphql;
const GraphQLDate = require('graphql-date')

//authentication imports
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const SECRET = "KHPChRl/8aDlXMCRuwnchB/xFu/SFJgV7hgA4/cQLvyZ1yUpSFXHFD" //openssl rand 256 | base64

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    login:{
      type: GraphQLString,
      args:{
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parent,args){
        const _user = await user.findOne({email: args.email}).exec()
        if(!_user){
          throw new Error("Wrong Credentials")
        }
        const valid = await bcrypt.compare(args.password, _user.password)
        if(!valid){
          throw new Error("Wrong Credentials")
        }

        const token = jwt.sign({ id: _user.id }, SECRET, { expiresIn: '1y' })
        return token;
      }
    },
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        password: { type: GraphQLString },
        birthday: { type: GraphQLString },
        rating: { type: GraphQLFloat },
      },
      async resolve(parent, args) {
        let _user = new user({
          name: args.name,
          email: args.email,
          phone: args.phone,
          password: await bcrypt.hash(args.password,12),
          birthday: args.birthday,
          rating: args.rating,
        });
        return _user.save();
      },
    },
    addAd: {
      type: AdType,
      args: {
        createdBy: { type: GraphQLID },
        date: { type: GraphQLDate },
        type: { type: AdTypeEnum },
        animalId: { type: GraphQLID },
        animalType: { type: AnimalTypeEnum },
        description: { type: GraphQLString },
        attendantId: { type: GraphQLID },
        status: { type: StatusEnum },
        coordinates: {
          type: GraphQLList(GraphQLFloat)
        }
      },
      resolve(parent, args) {
        let _ad = new ad({
          createdBy: args.createdBy,
          date: args.date,
          type: args.type,
          animalId: args.animalId,
          animalType: args.animalType,
          description: args.description,
          location: {
            type: "Point",
            coordinates: args.coordinates,
          },
          attendantId: args.attendantId,
          status: args.status,
        });
        return _ad.save();
      },
    },
    addAnimal: {
      type: AnimalType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLFloat },
        type: { type: AnimalTypeEnum },
        breed: { type: GraphQLString },
        gender: { type: AnimalGenderEnum },
      },
      resolve(parent, args) {
        let _animal = new animal({
          name: args.name,
          age: args.age,
          type: args.type,
          breed: args.breed,
          gender: args.gender,
        });
        return _animal.save();
      },
    },
    setAdStatus: {
      type: GraphQLString,
      args:{
        id: { type: GraphQLID },
        status: { type: StatusEnum }
      },
      async resolve(parent,args){
        let done = await ad.findByIdAndUpdate(args.id, {"status": args.status})
        console.log(done)
        if(done){
          return "Successfull";
        }
        else{
          throw new Error("Something went wrong");
        }
      }
    }
  },
});

module.exports = Mutation;
