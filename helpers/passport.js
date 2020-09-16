import passport from 'passport';
import bcrypt from 'bcrypt';

// import the config file
import config from '../../config';

// import the user model
import User from '../data/model/user';
import SocialAuth from '../data/model/socialAuth';

// SET PASSPORT STRATEGIES
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const FacebookTokenStrategy = require('passport-facebook-token');

// get Facebook credentials from config
const FACEBOOK_APP_ID = config.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = config.FACEBOOK_APP_SECRET;

const BCRYPT_SALT_ROUNDS = 12;

// options while extracting JWT in passport
const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: config.JWT_SECRET
};
const appleOpts = {
  jwtFromRequest: ExtractJWT.fromBodyField('token'),
  secretOrKey: config.JWT_SECRET
}
passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
      passReqToCallback: true
    },
    (req, email, password, done) => {
      try {
        User.findOne({ email: email })
          .exec()
          .then(user => {
            if (user !== null) {
              return done(null, false, { failed: 'email already exists.' });
            } else {
              bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                const user = new User({
                  email: email,
                  password: hashedPassword,
                  created: new Date(),
                  roles: ['user'],
                  name: req.body.name,
                  isApproved: false,
                  phoneNumber: req.body.phoneNumber,
                  phoneAuth: req.body.phoneAuth,
                  updated: new Date(),
                  profilePicture: req.body.profilePicture,
                  city: {
                    name: req.body.cityName,
                    placeId: req.body.placeId
                  },
                  about: req.body.about,
                  rating: req.body.rating,
                  emailVerified: req.body.emailVerified
                });

                user
                  .save()
                  .then(user => {
                    // NOTE: the return needs with passport-local - remove return in passport JWT to work
                    return done(null, user);
                  })
                  .catch(err => {
                    return done(null, false, {
                      failed: 'duplicate value error',
                      moreInfo: err
                    });
                  });
              });
            }
          });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
      passReqToCallback: true
    },
    (req, email, password, done) => {
      try {
        User.findOne({ email })
          .exec()
          .then(user => {
            if (user === null || !user) {
              return done(null, false, { message: "Email Doesn't Exist" });
            } else {
              bcrypt.compare(password, user.password).then(res => {
                if (res !== true) {
                  return done(null, false, {
                    failed: "Passwords don't match"
                  });
                }
                // NOTE: the return needs with passport-local - remove return in passport JWT to work
                return done(null, user, {
                  failed: 'User found and authenticated'
                });
              });
            }
          });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  'facebook-token',
  new FacebookTokenStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      fbGraphVersion: 'v3.0'
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile)
      try {
        SocialAuth.findOne({ facebookId: profile.id })
          .exec()
          .then(user => {
            if (user) {
              done(null, user, { success: { message: 'User found in DB from Passport' } });
            } else {
              const user = new SocialAuth({
                facebookId: profile.id,
              })
              user
                .save()
                .then(user => {
                  // NOTE: the return needs with passport-local - remove return in passport JWT to work
                  return done(null, user);
                })
                .catch(err => {
                  return done(null, false, {
                    failed: 'duplicate value error',
                    moreInfo: err
                  });
                });
            }
          });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  'jwt',
  new JWTStrategy(options, (jwt_payload, done) => {
    try {
      User.findOne({ email: jwt_payload.id })
        .exec()
        .then(user => {
          if (user) {
            done(null, user, { success: { message: 'User found in DB from Passport' } });
          } else {
            done(null, false, {
              failed: 'User not found in DB from passport'
            });
          }
        });
    } catch (err) {
      done(err);
    }
  })
);
