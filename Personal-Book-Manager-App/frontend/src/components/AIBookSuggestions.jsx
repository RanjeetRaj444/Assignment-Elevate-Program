import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_YOUR_GEMINI_API_KEY);

function AIBookSuggestions({ title, author }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSuggestions() {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      setLoading(true);
      setError("");
      try {
        const prompt = `Suggest 3 books similar to '${title}' by ${author}. Return in JSON format with title and author.`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const output = response.text().trim();
        const match = output.match(/```(?:json)?\n?([\s\S]*?)```/i);
        if (match && match[1]) {
          const cleanJSON = match[1].trim();
          try {
            const parsedArray = JSON.parse(cleanJSON);
            setSuggestions(parsedArray);
          } catch (err) {
            console.error("❌ JSON parsing failed:", err.message);
          }
        } else {
          console.error("❌ No JSON block found in the response.");
        }
      } catch (err) {
        console.error("AI Fetch Failed", err);
        setError("❌ Failed to fetch AI recommendations.");
      } finally {
        setLoading(false);
      }
    }

    fetchSuggestions();
  }, [title, author]);

  if (loading)
    return (
      <p className="text-blue-600 font-medium animate-pulse">
        Loading suggestions...
      </p>
    );
  if (error) return <p className="text-red-500 font-semibold">{error}</p>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-4">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span role="img" aria-label="crystal ball">
          🔮
        </span>
        AI-Powered Book Suggestions
      </h3>
      {suggestions.length > 0 ? (
        <div className="space-y-4">
          {suggestions.map((book, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-4 hover:shadow transition-shadow"
            >
              <h4 className="text-base font-semibold text-gray-800">
                {book.title}
              </h4>
              <p className="text-gray-600">By {book.author}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No suggestions found.</p>
      )}
    </div>
  );
}

export default AIBookSuggestions;
