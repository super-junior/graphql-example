const express = require('express')
const expressGraphQL = require('express-graphql')
const app = express()

const bookSchema = require('./schema')

app.use('/graphql', expressGraphQL({
    schema: bookSchema,
    graphiql: true
}))
app.listen(5000, () => console.log("Server is running"))