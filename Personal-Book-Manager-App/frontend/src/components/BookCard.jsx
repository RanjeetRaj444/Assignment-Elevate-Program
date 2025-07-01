import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-lg transition-shadow flex flex-col gap-2">
      <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
      <p className="text-gray-600">
        <span role="img" aria-label="author">
          👤
        </span>{" "}
        {book.author}
      </p>
      <p className="text-gray-500">
        <span role="img" aria-label="genre">
          📖
        </span>{" "}
        {book.genre}
      </p>
      <p className="text-green-700 font-semibold">
        <span role="img" aria-label="price">
          💰
        </span>{" "}
        ${book.price}
      </p>
      <Link
        to={`/book/${book.id}`}
        className="mt-2 inline-block text-blue-600 hover:text-blue-800 font-medium transition-colors"
      >
        View Details
      </Link>
    </div>
  );
}

export default BookCard;
