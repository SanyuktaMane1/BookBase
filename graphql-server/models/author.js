import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
  name: String,
});

export const Author = mongoose.model("Author", AuthorSchema);
