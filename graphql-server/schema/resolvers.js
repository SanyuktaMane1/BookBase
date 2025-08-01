import { Author } from "../models/author.js";
import { Book } from "../models/book.js";
import User from "../models/user.js";
import {
  hashPassword,
  comparePassword,
  createToken,
  getUserFromToken,
} from "../utils/auth.js";
import { fetchGoogleBookData } from "../utils/fetchGoogleBookData.js";

export const resolvers = {
  Query: {
    books: async (
      _,
      { name, genre, sortBy = "name", order = "asc", limit = 10, offset = 0 }
    ) => {
      const query = {};
      if (name) query.name = { $regex: name, $options: "i" };
      if (genre) query.genre = { $regex: genre, $options: "i" };

      const sortOrder = order === "desc" ? -1 : 1;
      return await Book.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(offset)
        .limit(limit)
        .populate("author");
    },

    book: async (_, { id }) => {
      return await Book.findById(id).populate("author");
    },

    authors: async (
      _,
      { name, sortBy = "name", order = "asc", limit = 10, offset = 0 }
    ) => {
      const query = {};
      if (name) query.name = { $regex: name, $options: "i" };

      const sortOrder = order === "desc" ? -1 : 1;
      return await Author.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(offset)
        .limit(limit)
        .populate("books");
    },

    author: async (_, { id }) => {
      return await Author.findById(id).populate("books");
    },

    me: async (_, __, { user }) => {
      if (!user) throw new Error("Unauthorized");
      return await User.findById(user.id);
    },
  },

  Mutation: {
    // BOOK MUTATIONS
    addBook: async (_, { name, genre, authorId }, { user }) => {
      if (!user || user.role !== "admin") {
        throw new Error("Only admins can add books");
      }

      const googleMetadata = await fetchGoogleBookData(name);

      const newBook = new Book({
        name,
        genre,
        author: authorId,
        googleMetadata,
      });
      const savedBook = await newBook.save();

      await Author.findByIdAndUpdate(authorId, {
        $push: { books: savedBook._id },
      });

      return savedBook.populate("author");
    },

    updateBook: async (_, { id, name, genre }, { user }) => {
      if (!user || user.role !== "admin") {
        throw new Error("Only admins can update books");
      }

      return await Book.findByIdAndUpdate(
        id,
        { name, genre },
        { new: true }
      ).populate("author");
    },

    deleteBook: async (_, { id }, { user }) => {
      if (!user || user.role !== "admin") {
        throw new Error("Only admins can delete books");
      }

      return await Book.findByIdAndDelete(id);
    },

    // AUTHOR MUTATIONS
    addAuthor: async (_, { name }, { user }) => {
      if (!user || user.role !== "admin") {
        throw new Error("Only admins can add authors");
      }

      return await new Author({ name }).save();
    },

    updateAuthor: async (_, { id, name }, { user }) => {
      if (!user || user.role !== "admin") {
        throw new Error("Only admins can update authors");
      }

      return await Author.findByIdAndUpdate(id, { name }, { new: true });
    },

    deleteAuthor: async (_, { id }, { user }) => {
      if (!user || user.role !== "admin") {
        throw new Error("Only admins can delete authors");
      }

      return await Author.findByIdAndDelete(id);
    },

    // AUTH MUTATIONS
    register: async (_, { username, password, role }) => {
      const existing = await User.findOne({ username });
      if (existing) throw new Error("User already exists");

      const hashed = await hashPassword(password);
      const user = await new User({
        username,
        password: hashed,
        role: role || "user",
      }).save();

      const token = createToken(user);
      return {
        id: user._id,
        username: user.username,
        role: user.role,
        token,
      };
    },

    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error("User not found");

      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = createToken(user);
      return {
        id: user._id,
        username: user.username,
        role: user.role,
        token,
      };
    },
  },

  Book: {
    author: async (parent) => {
      return await Author.findById(parent.author);
    },
  },

  Author: {
    books: async (parent) => {
      return await Book.find({ author: parent.id });
    },
  },
};
