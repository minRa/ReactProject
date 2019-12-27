const {ApolloServer, PubSub} = require('apollo-server');
const mongoose = require('mongoose');
const gql = require('graphql-tag');
const Post = require('./models/Post');
const {MONGODB}= require('./config.js');

const typeDefs = gql`
    type Post {
        id:ID!
        body:String!
        createdAt:String!
        username:String!
    }
    type Query {
        getPosts:[Post]
    }
`;

const resolvers = {
    Query:{
        async getPosts(){
            try {
                const post = await Post.find();
                return post
            }catch (err){
                throw new Error(err);
            }
        }
    }
}


const PORT = process.env.PORT || 5000;
const server = new ApolloServer({
     typeDefs,
     resolvers,
});

mongoose
    .connect(MONGODB,{useNewUrlParser:true, useUnifiedTopology: true})
    .then(()=>{
        console.log('MongoDB Connected !');
        return server.listen({port:PORT});
    })
    .then((res) =>{
        console.log(`Server running at ${res.uri}`);
    })
    .catch(err =>{
        console.log(err);
    });
