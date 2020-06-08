const express = require('express')
const expressGraphQL = require('express-graphql')
const app = express()

const {books, authors} = require('./library')
const bookSchema = require('./schema')

// GraphQL
app.get('/graphql', expressGraphQL({
    schema: bookSchema,
    graphiql: false
}))

app.post('/graphql', expressGraphQL({
    schema: bookSchema,
    graphiql: true
}))

// REST
app.get('/books/:id', (req, res) => {
    res.json(books.find(book => book.id == req.params.id))
})

app.get('/authors/:id', (req, res) => {
    res.json(authors.find(author => author.id == req.params.id))
})


app.listen(5000, () => console.log("Server is running"))