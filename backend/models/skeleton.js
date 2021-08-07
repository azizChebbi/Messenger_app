// signup login messages users 
const graphql = require('graphql')
const {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLNonNull,GraphQLList,GraphQLSchema} = graphql
const {user} = require('./schema.js')

const Usertype = new GraphQLObjectType({
    name:"user" ,
    fields : {
        id:{type:new GraphQLNonNull(GraphQLID)} ,
        name :{type:new GraphQLNonNull(GraphQLString)}
    }
})

const RootQuery = new GraphQLObjectType({
    name:"RootQuery" , 
    fields : ()=>({
        Users : {
            type : new GraphQLList(Usertype) , 
            resolve(parent,args){
                return user.find({})
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query : RootQuery
})