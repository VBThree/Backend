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
const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLFloat,
  GraphQLID,
} = graphql;
const GraphQLDate = require("graphql-date");

//authentication imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const config = require("../../config");

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    login: {
      type: GraphQLString,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent,args, { SECRET }){
        const _user = await user.findOne({email: args.email}).exec()
        if(!_user){
          throw new Error("Wrong Credentials")
        }
        const valid = await bcrypt.compare(args.password, _user.password);
        if (!valid) {
          throw new Error("Wrong Credentials");
        }

        const token = jwt.sign({ id: _user.id }, SECRET, { expiresIn: "1y" });
        return token;
      },
    },
    register: {
      type: GraphQLString,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        phone: { type: GraphQLString },
        birthday: { type: GraphQLDate },
        rating: { type: GraphQLFloat },
        photo: { type: GraphQLString },
      },
      async resolve(parent, args, { SECRET }) {
        
        let _user = new user({
          name: args.name,
          email: args.email,
          password: await bcrypt.hash(args.password, 12),
          phone: args.phone,
          birthday: args.birthday,
          rating: args.rating,
          photo: args.photo,
        });
        _user.save();

        const token = jwt.sign({ id: _user.id }, SECRET, { expiresIn: "1y" });
        return token;
      },
    },
    addAnnouncement: {
      type: AnnouncementType,
      args: {
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
          type: GraphQLList(GraphQLFloat),
        },
        photo: { type: GraphQLList(GraphQLString) },
      },
      resolve(parent, args, { userToken }) {
        if (!userToken) {
          throw new Error("Unauthorized Access")
        } 
        let _announcement = new announcement({
          createdBy: userToken.id,
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
          photo: args.photo,
        });
        return _announcement.save();
      },
    },
    setAnnouncementStatus: {
      type: GraphQLString,
      args:{
        id: { type: GraphQLID },
        status: { type: StatusEnum }
      },
      async resolve(parent,args, { userToken }){
        if (!userToken) {
          throw new Error("Unauthorized Access")
        } 
        let done = await announcement.findByIdAndUpdate(args.id, {
          "attendantId": userToken.id,
          "status": args.status
        })
        if(done){
          return "Successfull";
        } else {
          throw new Error("Something went wrong");
        }
      },
    },
    profileEdit: {
      type: GraphQLString,
      args: {
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        birthday: { type: GraphQLDate },
        photo: { type: GraphQLString },
      },
      async resolve(parent, args, { userToken }) {
        if (!userToken) {
          throw new Error("Unauthorized Access")
        } 
        let done = await user.findByIdAndUpdate(userToken.id, {
          "name": args.name,
          "phone": args.phone,
          "email": args.email,
          "birthday": args.birthday,
          "photo": args.photo
        })
        if (done) {
          return "Successfull";
        } else {
          throw new Error("Something went wrong");
        }
      },
    },
    changePassword: {
      type: GraphQLString,
      args: {
        oldPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString },
      },
      async resolve(parent, args, { userToken }) {
        if (!userToken) {
          throw new Error("Unauthorized Access")
        }

        let _user = await user.findById(userToken.id).exec();

        let valid = await bcrypt.compare(args.oldPassword, _user.password)

        if(!valid){
          throw new Error("Wrong Old Password")
        }

        let done = await user.findByIdAndUpdate(userToken.id, {
          "password": await bcrypt.hash(args.newPassword, 12),
        })

        if (done) {
          return "Password Successfully Changed";
        } else {
          throw new Error("Something went wrong");
        }


      },
    },
    requestReset: {
      type: GraphQLString,
      args: {
        email: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const _user = await user.findOne({ email: args.email }).exec()

        if (!_user) {
          throw new Error("No user with this email");
        }

        let resetToken = Math.floor(100000 + Math.random() * 900000);

        let expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 30);
        expiryDate = new Date(expiryDate);

        let done = await user.findByIdAndUpdate(_user.id, {
          resetToken: resetToken,
          expiryDate: expiryDate,
        });

        if (!done) {
          throw new Error("Something went wrong");
        }

        var smtpTransport = nodemailer.createTransport(
          "smtps://" +
            config.SMTP_EMAIL +
            ":" +
            encodeURIComponent(config.SMTP_PASS) +
            "@smtp.gmail.com:465"
        );
        var mailOptions = {
          from: config.SMTP_EMAIL,
          to: _user.email,
          subject: "Reset Password",
          text: `Your token is ${resetToken}`,
        };
        smtpTransport.sendMail(mailOptions, function (error, response) {
          if (error) {
            throw new Error("Cant send email");
          }
        });

        return "Successfull";
      },
    },
    confirmReset: {
      type: GraphQLString,
      args: {
        resetToken: { type: GraphQLString }
      },
      async resolve(parent, args) {

        const _user = await user.findOne({ resetToken: args.resetToken }).exec()

        if (!_user) {
          throw new Error("Wrong Token");
        }

        return "Successfull";
      },
    },
    resetPassword: {
      type: GraphQLString,
      args: {
        resetToken: { type: GraphQLString },
        newPassword: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const _user = await user.findOne({ resetToken: args.resetToken }).exec()

        if (!_user) {
          throw new Error("Wrong Token");
        }

        bcrypt.compare(args.newPassword, _user.password, async function (
          err,
          result
        ) {
          if (result == true) {
            throw new Error("New pass cant be old pass");
          } else {
            let done = await user.findByIdAndUpdate(_user.id, {
              password: await bcrypt.hash(args.newPassword, 12),
              resetToken: undefined,
              expiryDate: undefined
            });
            if (done) {
              return "Successfull";
            } else {
              throw new Error("Some error occured");
            }
          }
        });
      },
    },
  },
});

module.exports = Mutation;
