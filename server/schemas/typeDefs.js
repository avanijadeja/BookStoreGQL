const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Define what can be queried for each User
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    # Add a queryable field to retrieve an array of Book objects
    saveBooks: [Book]
  }

  # Define what can be queried for each Book
  type Book {
    bookId: String
    # Add a queryable field to retrieve an array of String objects , as there may be more than one author.
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    # References the User type.
    user: User
  }

  # input type saveBookInput - special object that groups a set of arguments together, and can then be used as an argument to another fields.like in mutation savebook saveBookInput is using as arguments which replace with bookID,authors,description,title,image,link
  input saveBookInput {
    bookId: String
    # Add a queryable field to retrieve an array of String objects , as there may be more than one author.
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type query {
    # me - Which returns a User type.
    me: User
  }

  type Mutation {
    # Accepts an email and password as parameters; returns an Auth type.
    login(email: String!, password: String!): Auth
    # Accepts a username, email, and password as parameters; returns an Auth type.
    addUser(username: String!, email: String!, password: String!): Auth
    #  Accepts input type saveBookInput handle all of these parameters like a book author's array, description, title, bookId, image, and link as parameters and return a user type.
    saveBook(bookData: saveBookInput!): User
    # Accepts a book's bookId as a parameter; returns a User type.
    removeBook(bookId: String): User
  }
`;

//  export typeDefs
module.exports = typeDefs;
