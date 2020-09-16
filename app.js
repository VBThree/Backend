const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const jwt = require("jsonwebtoken")

const app = express()

const schema = require("./schema/schema")
const config = require("./config")
const mongoose = require('mongoose');

mongoose.connect(config.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

mongoose.set('useCreateIndex', true);

mongoose.connection.once("open", () => {
    console.log("connected to database")
})

const SECRET = "KHPChRl/8aDlXMCRuwnchB/xFu/SFJgV7hgA4/cQLvyZ1yUpSFXHFD"

const auth = async (req) => {
    const token = req.headers.authorization
    try {
        const userToken = await jwt.verify(token, SECRET)
        req.userToken = userToken
    } catch (error) {
        console.log(error)
    }

    req.next()
}

app.use(auth)

app.use("/graphql", graphqlHTTP(req =>({
    schema,
    context: {
        SECRET,
        userToken: req.userToken
    },
    graphiql: true
})))

app.listen(3000, () => console.log("server started"))