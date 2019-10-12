// const { GraphQLServer } = require('graphql-yoga');
import {GraphQLServer} from 'graphql-yoga'

const typeDefs = `
    type Query {
        me: User!,
        post: Post!
    }

    type User {
        id: ID!,
        name: String!,
        email: String!,
        age: Int
    }

    type Post {
        id: ID!,
        title: String!,
        body: String!,
        published: Boolean!
    }
`

const resolvers = {
    Query: {
        me: ()=>{
            return {
                id: '1111', name:'sri', age:32, email:'sri@sri.com'
            }
        },
        post: ()=>{
            return {id: '092', title: 'Title1', body: 'Body1', published: true}
        }
    }
}

const server = new GraphQLServer({
    typeDefs, resolvers
})

server.start(()=>{
    console.log('graphQl server started');
})