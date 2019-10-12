// const { GraphQLServer } = require('graphql-yoga');
import {GraphQLServer} from 'graphql-yoga'

const users = [
    {id:'aaa', name: 'sr1', email: 'sr1@.com'},
    {id:'bbb', name: 'sr2', email: 'sr2@.com'},
    {id:'ccc', name: 'sr3', email: 'sri3@.com'},
]

const typeDefs = `
    type Query {
        me: User!,
        post: Post!
        users: [User!]!        
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
        },
        users: () =>{
            return users;
        },
        /*greeting: (parent, args, ctx, info) =>{
            if(args.name) {
                return `hi there ${args.name}`;
            } else {
                return `hi there`;
            }
        },
        add: (parent,args, ctx, info)=>{
            if(args.numbers.length === 0){
                return 0;
            } else {
                return args.numbers.reduce((acctr, currVal) =>{
                    return acctr+currVal;
                })
            }
        }*/
    }
}

const server = new GraphQLServer({
    typeDefs, resolvers
})

server.start(()=>{
    console.log('graphQl server started');
})