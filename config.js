"use strict";
// this file contains all the key value pairs for connecting to various apis.

// read the .env file if dev environment
if (process.env.NODE_ENV !== "production") {
  const result = require("dotenv").config();
  console.log(result.parsed);
  if (result.error) {
    console.log("There was an error while reading the environment variables.");
    throw result.error;
  }
}

// requires this es5 syntax, because babel doesn't take care of this in producion
const config = {
  SECRET: process.env.SECRET,
  MONGODB_URI: process.env.MONGODB_URI, //your mongodb url
  SMTP_EMAIL: process.env.SMTP_EMAIL, // example hostname "localhost"
  SMTP_PASS: process.env.SMTP_PASS
};

module.exports = config;