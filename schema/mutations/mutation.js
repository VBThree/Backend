const graphql = require("graphql");
const {
  GraphQLObjectType,
} = graphql;


const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        
    }
})

module.exports = Mutation;