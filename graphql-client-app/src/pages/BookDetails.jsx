import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_BOOK_BY_ID } from "../graphql/queries/bookQueries";

function BookDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_BOOK_BY_ID, {
    variables: { id },
  });

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">Error: {error.message}</p>
    );

  if (!data?.book) return <p className="text-center mt-10">Book not found.</p>;

  const { name, genre, author, googleMetadata } = data.book;

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{name}</h1>

      <p className="text-gray-600 text-lg mb-2">
        <strong>Genre:</strong> {genre}
      </p>

      {author && (
        <div className="text-gray-700 text-lg mb-4">
          <p>
            <strong>Author:</strong> {author.name}
          </p>
        </div>
      )}

      {googleMetadata && (
        <div className="bg-white shadow p-4 rounded-md mt-6">
          {googleMetadata.thumbnail && (
            <img
              src={googleMetadata.thumbnail}
              alt="Book cover"
              className="w-40 h-auto mb-4"
            />
          )}
          {googleMetadata.description && (
            <p className="text-gray-700 text-sm mb-4 whitespace-pre-wrap">
              {googleMetadata.description}
            </p>
          )}
          {googleMetadata.infoLink && (
            <a
              href={googleMetadata.infoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:underline"
            >
              View on Google Books →
            </a>
          )}
        </div>
      )}

      <div className="mt-6"></div>
    </div>
  );
}

export default BookDetails;
