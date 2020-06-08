const books = require('./library')

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
        authorId: {type: new GraphQLNonNull(GraphQLInt)}
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
        }
    })
})

const bookSchema = new GraphQLSchema({
    query: RootQueryType
})

module.exports = bookSchema