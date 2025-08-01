import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../graphql/queries/bookQueries";
import { useState } from "react";
import { Link } from "react-router-dom";

const genres = ["Biography", "Sci-Fi", "Mystery", "Non-fiction"];
const BOOKS_PER_PAGE = 6;

function BookList() {
  const [filters, setFilters] = useState({
    name: "",
    genre: "",
    limit: BOOKS_PER_PAGE,
    offset: 0,
  });

  const { loading, error, data, refetch } = useQuery(GET_BOOKS, {
    variables: filters,
    fetchPolicy: "network-only",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = {
      ...filters,
      [name]: value,
      offset: 0,
    };
    setFilters(updatedFilters);
    refetch(updatedFilters);
  };

  const handlePrev = () => {
    const newOffset = Math.max(0, filters.offset - BOOKS_PER_PAGE);
    const updatedFilters = { ...filters, offset: newOffset };
    setFilters(updatedFilters);
    refetch(updatedFilters);
  };

  const handleNext = () => {
    const newOffset = filters.offset + BOOKS_PER_PAGE;
    const updatedFilters = { ...filters, offset: newOffset };
    setFilters(updatedFilters);
    refetch(updatedFilters);
  };

  const totalBooks = data?.books?.length || 0;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Book Library
      </h2>

      {/* Filter Inputs */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleInputChange}
          placeholder="Search by book name"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <select
          name="genre"
          value={filters.genre}
          onChange={handleInputChange}
          className="px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-blue-500">Loading books...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error.message}</p>
      ) : data?.books?.length === 0 ? (
        <p className="text-center text-gray-500">No books found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.books.map((book) => (
              <Link to={`/books/${book.id}`} key={book.id}>
                <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300 border cursor-pointer h-58 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {book.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      Genre: <span className="font-medium">{book.genre}</span>
                    </p>
                    {book.author && (
                      <p className="text-sm text-gray-600">
                        Author:{" "}
                        <span className="font-medium">{book.author.name}</span>
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-blue-500 mt-2">View Details</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={handlePrev}
              disabled={filters.offset === 0}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={totalBooks < BOOKS_PER_PAGE}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default BookList;
