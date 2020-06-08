const express = require('express')
const expressGraphQL = require('express-graphql')
const app = express()
var bodyParser = require('body-parser')

const {books, authors} = require('./library')
const bookSchema = require('./schema')

app.use(bodyParser.json())
app.listen(5000, () => console.log("Server is running"))

// REST
app.get('/books/:id', (req, res) => {
    res.json(books.find(book => book.id == req.params.id))
})

app.get('/books', (_, res) => {
    res.json(books)
})

app.post('/books', (req, res) => {
    console.log(req.body)
    books.push(req.body)
    res.status(201).json(req.body)
})

app.delete('/books/:id', (req, res) => {
    const deletedIndex = books.findIndex(book => book.id == req.params.id)
    if (deletedIndex != -1) {
        books.splice(deletedIndex, 1)
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})

app.get('/authors/:id', (req, res) => {
    res.json(authors.find(author => author.id == req.params.id))
})

app.get('/authors', (_, res) => {
    res.json(authors)
})