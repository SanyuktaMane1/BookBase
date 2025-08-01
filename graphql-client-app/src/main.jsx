import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "./index.css";
import Layout from "./components/Layout.jsx";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import BookDetails from "./pages/BookDetails";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/books/:id" element={<BookDetails />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
