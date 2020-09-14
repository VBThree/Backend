const express = require("express")
const { graphqlHTTP } = require("express-graphql")

const app = express()

const schema = require("./schema/schema")

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/graphqldb', { useUnifiedTopology: true, useNewUrlParser: true });

mongoose.connection.once("open", () => {
    console.log("connected to database")
})

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true  
}))

app.listen(3000, () => console.log("server started"))