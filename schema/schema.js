const RootQuery = require("./rootQueries/rootQueries")
const Mutation = require("./mutations/mutation")
const { GraphQLSchema } = require("graphql")

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation
})