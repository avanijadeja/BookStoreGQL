const { gql } = require("apollo-server-express");

const typeDefs = gql`

 # Define what can be queried for each User
  type User {
    _id: _id
    username: String
    email: String
    bookCount: Int
    # Add a queryable field to retrieve an array of Book objects
    saveBooks: [Book]
  }


  # Define what can be queried for each Book
  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input saveBookInput {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: saveBookInput!): User
    removeBook(bookId: String): User
  }
`;

module.exports = typeDefs;
