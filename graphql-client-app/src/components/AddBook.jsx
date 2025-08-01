// import { useMutation, useQuery } from "@apollo/client";
// import { useState } from "react";
// import { GET_AUTHORS } from "../graphql/queries/authorQueries";
// import { ADD_BOOK } from "../graphql/mutations/bookmutations";

// function AddBook() {
//   const [form, setForm] = useState({ name: "", genre: "", authorId: "" });
//   const [success, setSuccess] = useState(false);

//   const { data } = useQuery(GET_AUTHORS);
//   const [addBook] = useMutation(ADD_BOOK, {
//     refetchQueries: ["GetBooks"],
//     onCompleted: () => {
//       setForm({ name: "", genre: "", authorId: "" });
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 2000);
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!form.name || !form.genre || !form.authorId) return;
//     addBook({ variables: form });
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//       <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
//         Add a Book
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Book name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//         />
//         <input
//           type="text"
//           placeholder="Genre"
//           value={form.genre}
//           onChange={(e) => setForm({ ...form, genre: e.target.value })}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//         />
//         <select
//           value={form.authorId}
//           onChange={(e) => setForm({ ...form, authorId: e.target.value })}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
//         >
//           <option value="">Select author</option>
//           {data?.authors.map((a) => (
//             <option key={a.id} value={a.id}>
//               {a.name}
//             </option>
//           ))}
//         </select>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
//         >
//           Add Book
//         </button>
//         {success && (
//           <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
//             <p className="text-green-700 text-center font-medium">
//               Book added successfully!
//             </p>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }

// export default AddBook;

import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_AUTHORS } from "../graphql/queries/authorQueries";
import { ADD_BOOK } from "../graphql/mutations/bookmutations";

function AddBook() {
  const [form, setForm] = useState({ name: "", genre: "", authorId: "" });
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useQuery(GET_AUTHORS);
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: ["GetBooks"],
    onCompleted: () => {
      setForm({ name: "", genre: "", authorId: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.genre || !form.authorId) return;

    setIsLoading(true);
    try {
      await addBook({ variables: form });
    } catch (error) {
      console.error("Error adding book:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Add a Book
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Book name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          disabled={isLoading}
        />
        <input
          type="text"
          placeholder="Genre"
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          disabled={isLoading}
        />
        <select
          value={form.authorId}
          onChange={(e) => setForm({ ...form, authorId: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
          disabled={isLoading}
        >
          <option value="">Select author</option>
          {data?.authors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:transform-none"
        >
          {isLoading ? "Adding Book..." : "Add Book"}
        </button>
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
            <p className="text-green-700 text-center font-medium">
              Book added successfully!
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

export default AddBook;
