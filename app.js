const express = require("express")
const { graphqlHTTP } = require("express-graphql")

const app = express()

const schema = require("./schema/schema")
const config = require("./config")
const mongoose = require('mongoose');
mongoose.connect(config.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

mongoose.set('useCreateIndex', true);

mongoose.connection.once("open", () => {
    console.log("connected to database")
})

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true  
}))

app.listen(3000, () => console.log("server started"))