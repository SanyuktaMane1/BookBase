import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBooks($name: String, $genre: String, $limit: Int, $offset: Int) {
    books(name: $name, genre: $genre, limit: $limit, offset: $offset) {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
`;

export const GET_BOOK_DETAILS = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        name
      }
    }
  }
`;

export const GET_BOOK_BY_ID = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
      }
      googleMetadata {
        thumbnail
        description
        infoLink
      }
    }
  }
`;
