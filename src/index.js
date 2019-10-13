// const { GraphQLServer } = require('graphql-yoga');
import {GraphQLServer} from 'graphql-yoga'
import uuidv4 from 'uuid';

const users = [
    {id:'userId1', name: 'sr1', email: 'sri1@.com'},
    {id:'userId2', name: 'sr2', email: 'sri2@.com'},
    {id:'userId3', name: 'sr3', email: 'sri3@.com'},
]

const posts = [
    {id:'postId1', title: 'postTitle1', body: 'postBody1', published: true, author: 'userId1'},
    {id:'postId2', title: 'postTitle2', body: 'postBody2', published: false, author: 'userId2'},
    {id:'postId3', title: 'postTitle3', body: 'postBody3', published: true, author: 'userId1'},
]

const typeDefs = `
    type Query {
        me: User!,
        posts: [Post!]!
        users: [User!]!        
    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
    }

    type User {
        id: ID!,
        name: String!,
        email: String!,
        age: Int,
        posts: [Post!]!
    }

    type Post {
        id: ID!,
        title: String!,
        body: String!,
        published: Boolean!,
        author: User!
    }
`

const resolvers = {
    Query: {
        me: ()=>{
            return {
                id: '1111', name:'sri', age:32, email:'sri@sri.com'
            }
        },
        posts: ()=>{
            return posts;
        },
        users: () =>{
            return users;
        },
    },
    Mutation: {
        createUser: (parent, args, ctx, info) =>{
            const emailTaken = users.some(x=>x.email === args.email);
            if(emailTaken) {
                throw new Error('email taken');
            }

            const user = {
                id: uuidv4(), name: args.name, email: args.email, age: 2
            };

            users.push(user);
            return user;
        },
        createPost(parent, args, ctx, info){
            const userExistis = users.some(x=> x.id === args.author);
            if(!userExistis){
                throw new Error('user doesnt exists');
            }
            const post = {
                id: uuidv4(), title: args.title, body: args.body, published: args.published, author: args.author
            };
            posts.push(post);
            return post;
        }
    },
    Post: {
        author: (parent, args, ctx, info)=>{
            return users.find((user)=>{
                return user.id === parent.author
            })
        }
    },
    User: {
        posts: (parent, args, ctx, info)=>{
            return posts.filter(x=>x.author === parent.id);
        }
    }
}

const server = new GraphQLServer({
    typeDefs, resolvers
})

server.start(()=>{
    console.log('graphQl server started');
})