import { gql } from "@apollo/client";

export const ADD_AUTHOR = gql`
  mutation AddAuthor($name: String!) {
    addAuthor(name: $name) {
      id
      name
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($id: ID!, $name: String) {
    updateAuthor(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
      id
    }
  }
`;
