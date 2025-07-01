import { useEffect, useState } from "react";
import { getBooks } from "../utils/localStorage";
import BookCard from "../components/BookCard";
import FilterBar from "../components/FilterBar";
import { Link } from "react-router-dom";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const allBooks = getBooks();
    setBooks(allBooks);
    setFiltered(allBooks);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="flex flex-col items-center py-8 bg-gradient-to-r from-blue-200 to-green-200 shadow">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center gap-2">
          <span role="img" aria-label="books">
            📚
          </span>{" "}
          Book Manager
        </h1>
        <Link to="/add-book" className="mt-6">
          <button className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow transition-all duration-200">
            <span className="text-xl">＋</span> Add Book
          </button>
        </Link>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <FilterBar books={books} setFiltered={setFiltered} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-400 text-lg py-12">
              No books found. Try adding a new one!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
