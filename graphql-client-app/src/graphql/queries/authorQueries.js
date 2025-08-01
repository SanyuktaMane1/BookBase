import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
  query GetAuthors(
    $name: String
    $sortBy: String
    $order: String
    $limit: Int
    $offset: Int
  ) {
    authors(
      name: $name
      sortBy: $sortBy
      order: $order
      limit: $limit
      offset: $offset
    ) {
      id
      name

      books {
        id
        name
      }
    }
  }
`;

export const GET_AUTHOR = gql`
  query GetAuthor($id: ID!) {
    author(id: $id) {
      id
      name

      books {
        id
        name
        genre
      }
    }
  }
`;
