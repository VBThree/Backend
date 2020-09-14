const graphql = require("graphql")
const { Mongoose } = require("mongoose")

const { 
    GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID,
    GraphQLInt,
    GraphQLList } = graphql


// const UserType = new GraphQLObjectType({
//     name:"User",
//     fields:() => ({ //it needs to be a function because of relation between different objects
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         products: {
//             type: new GraphQLList(ProductType),
//             resolve(parent,args){
//                 return Product.find({sellerId: parent.id})
//             }
//         }
//     })
// })

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
        
    }
})

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation
})