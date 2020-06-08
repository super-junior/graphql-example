const {books, authors} = require('./library')

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
} = require('graphql')

const BookType = new GraphQLObjectType({
    name: "Books",
    description: "This represents a book written by an author",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLInt)},
        author: {
            type: AuthorType,
            resolve: (book) => authors.find(author => author.id === book.authorId)
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Authors",
    description: "This is an author",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        book: {
            type: new GraphQLList(BookType),
            resolve: (author) => books.filter(book => book.authorId === author.id)
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: "Root Query",
    fields: () => ({
        books: {
            type: new GraphQLList(BookType),
            description: "List of All Books",
            resolve: () => books
        },
        authors:{
            type: new GraphQLList(AuthorType),
            description: "List of All Authors",
            resolve: () => authors
        }
    })
})

const bookSchema = new GraphQLSchema({
    query: RootQueryType
})

module.exports = bookSchema