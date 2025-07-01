import { useParams, useNavigate } from "react-router-dom";
import { getBooks } from "../utils/localStorage";
import AIBookSuggestions from "../components/AIBookSuggestions";

function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = getBooks().find((b) => b.id === id);

  if (!book)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg font-semibold">Book not found</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-screen bg-white rounded-xl shadow-lg p-8">
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          ← Back to Home
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h2>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Author:</span> {book.author}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Genre:</span> {book.genre}
        </p>
        <p className="text-green-700 font-semibold mb-1">
          <span className="font-semibold">Price:</span> ${book.price}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Description:</span>{" "}
          {book.description || "N/A"}
        </p>

        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <span role="img" aria-label="robot">
            🤖
          </span>
          AI Recommendations
        </h3>
        <AIBookSuggestions title={book.title} author={book.author} />
      </div>
    </div>
  );
}

export default BookDetailPage;
