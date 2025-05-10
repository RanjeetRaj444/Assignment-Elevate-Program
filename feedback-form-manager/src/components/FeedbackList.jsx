export default function FeedbackList({ feedbackList, filtered }) {
  if (feedbackList.length === 0) {
    return <p className="text-center text-gray-500">No Feedback Yet</p>;
  }

  if (filtered.length === 0) {
    return <p className="text-center text-gray-500">No matching feedback</p>;
  }

  if (filtered.length > 10) {
    return (
      <p className="text-center text-red-500">
        Too many results. Refine your search.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {filtered.map((f) => (
        <div
          key={f.id}
          className={`p-4 border rounded shadow-sm ${
            f.rating === 5 ? "border-green-500" : "border-gray-300"
          }`}
        >
          <h3 className="font-semibold">{f.name}</h3>
          <p className="text-sm text-gray-700">{f.feedback}</p>
          <p className="text-sm mt-1">
            <strong>Rating:</strong> {f.rating}
          </p>
          <p className="text-xs text-gray-400">{f.timestamp}</p>
        </div>
      ))}
    </div>
  );
}
