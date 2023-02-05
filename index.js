const { ApolloServer } = require('apollo-server')

const mongoose = require('mongoose')

const env = require('dotenv').config()

const port = process.env.PORT || 5000

const resolvers = require('./graphql/resolvers')

const typeDefs = require('./graphql/typeDefs')

const server = new ApolloServer({

    typeDefs,
    resolvers

})

mongoose.set('strictQuery', true)

mongoose.connect( 
    
    process.env.MONGO_URI, 
    
    { useNewUrlParser: true },
    
    ).then(

    () => {

        console.log(`MongoDb connected `)

        return server.listen( port )
    }

).then((res) => {

    console.log(`Server is at ${res.url}`);

})

