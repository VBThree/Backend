//model imports
const announcement = require("../../models/announcement");
const user = require("../../models/user");

//type imports
const AnnouncementType = require("../types/announcementType");
const UserType = require("../types/userType");

//enum imports
const AnnouncementTypeEnum = require("../types/enums/announcementTypeEnum");
const AnimalSpeciesEnum = require("../types/enums/animalSpeciesEnum");
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
        password: { type: GraphQLString },
        phone: { type: GraphQLString },
        birthday: { type: GraphQLDate },
        rating: { type: GraphQLFloat },
      },
      async resolve(parent, args) {
        let _user = new user({
          name: args.name,
          email: args.email,
          password: await bcrypt.hash(args.password, 12),
          phone: args.phone,
          birthday: args.birthday,
          rating: args.rating,
        });
        return _user.save();
      },
    },
    addAnnouncement: {
      type: AnnouncementType,
      args: {
        createdBy: { type: GraphQLID },
        date: { type: GraphQLDate },
        type: { type: AnnouncementTypeEnum },
        species: { type: AnimalSpeciesEnum },
        gender: { type: AnimalGenderEnum },
        breed: { type: GraphQLString },
        age: { type: GraphQLFloat },
        description: { type: GraphQLString },
        status: { type: StatusEnum },
        attendantId: { type: GraphQLID },
        coordinates: {
          type: GraphQLList(GraphQLFloat)
        }
      },
      resolve(parent, args) {
        let _announcement = new announcement({
          createdBy: args.createdBy,
          date: args.date,
          type: args.type,
          species: args.species,
          gender: args.gender,
          breed: args.breed,
          age: args.age,
          description: args.description,
          status: args.status,
          attendantId: args.attendantId,
          location: {
            type: "Point",
            coordinates: args.coordinates,
          },
        });
        return _announcement.save();
      },
    }
  },
});



module.exports = Mutation;
