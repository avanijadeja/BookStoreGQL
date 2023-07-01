import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email:String!, $password:String!)
    {
        login(email:$email, password:$password) 
        {
            token
            user  
            {
                -ID
                username
            }
        }
    }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        bookCount
      }
    }
  }
`;

export const SAVVE_BOOK = gql`
  mutation saveBook($bookData: saveBookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      savedBooks {
        bookId
        authorsdescription
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBookds {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
