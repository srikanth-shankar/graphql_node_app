// const { GraphQLServer } = require('graphql-yoga');
import {GraphQLServer} from 'graphql-yoga'

const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!,
        a: String!
    }
`

const resolvers = {
    Query: {
        title() {
            return 'Book'
        },
        price(){
            return 12.99
        },
        releaseYear(){
            return 2000
        },
        rating(){
            return null
        },
        inStock(){
            return true
        },
        a: () => {
            return 'aaa';
        }
    }
}

const server = new GraphQLServer({
    typeDefs, resolvers
})

server.start(()=>{
    console.log('graphQl server started');
})