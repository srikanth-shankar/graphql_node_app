import {GraphQLServer} from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Mutation from './resolvers/Mutation';

const server = new GraphQLServer({
    typeDefs: '../src/schema.graphql', 
    resolvers: {
        User, Post, Mutation, Query
    },
    context:{
        db
    }
})

server.start(()=>{
    console.log('graphQl server started');
})