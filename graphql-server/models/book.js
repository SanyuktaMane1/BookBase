import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  name: String,
  genre: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  googleMetadata: {
    thumbnail: String,
    description: String,
    infoLink: String,
  },
});

export const Book = mongoose.model("Book", BookSchema);
