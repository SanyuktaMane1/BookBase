import { gql } from "graphql-tag";

const typeDefs = gql`
  type Book {
    id: ID!
    name: String!
    genre: String!
    author: Author
    googleMetadata: GoogleBookMetadata
  }

  type GoogleBookMetadata {
    thumbnail: String
    description: String
    infoLink: String
  }

  type Author {
    id: ID!
    name: String!
    books: [Book]
  }

  type User {
    id: ID!
    username: String!
    role: String!
    token: String
  }

  type Query {
    book(id: ID!): Book
    books(
      name: String
      genre: String
      sortBy: String
      order: String
      limit: Int
      offset: Int
    ): [Book]

    author(id: ID!): Author
    authors(
      name: String
      sortBy: String
      order: String
      limit: Int
      offset: Int
    ): [Author]

    me: User
  }

  type Mutation {
    # Book and Author operations
    addBook(name: String!, genre: String!, authorId: ID!): Book
    updateBook(id: ID!, name: String, genre: String): Book
    deleteBook(id: ID!): Book

    addAuthor(name: String!): Author
    updateAuthor(id: ID!, name: String): Author
    deleteAuthor(id: ID!): Author

    # Auth operations
    register(username: String!, password: String!, role: String): User
    login(username: String!, password: String!): User
  }
`;

export default typeDefs;
