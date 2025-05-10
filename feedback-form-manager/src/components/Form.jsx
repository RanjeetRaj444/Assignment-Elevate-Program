export default function Form({
  name,
  feedback,
  ratingRef,
  setName,
  setFeedback,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        type="text"
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        value={feedback}
        placeholder="Your feedback"
        onChange={(e) => setFeedback(e.target.value)}
        rows={3}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        ref={ratingRef}
        min={1}
        max={5}
        placeholder="Rating (1–5)"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
