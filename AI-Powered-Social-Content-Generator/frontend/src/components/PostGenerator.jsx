import { useState } from "react";
import { generatePlatformPost } from "../utils/useGemini";

export default function PostGenerator() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("LinkedIn");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleGenerate = async () => {
    if (!topic.trim()) return alert("Please enter a topic");
    setLoading(true);
    const post = await generatePlatformPost(topic, platform);
    setPosts([...posts, { post, platform }]);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">
        Social Media Post Generator
      </h1>

      <div className="input-container flex justify-center gap-4">
        <input
          type="text"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className=" border p-2 mb-4 rounded"
        />

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className=" border p-2 mb-4 rounded"
        >
          <option value="LinkedIn">LinkedIn</option>
          <option value="Twitter">Twitter</option>
          <option value="Instagram">Instagram</option>
        </select>

        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 "
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Post"}
        </button>
      </div>

      <div className="post-conainer grid grid-cols-3 gap-4 max-h-full">
        {posts.length > 0 &&
          posts.map((ele, ind) => (
            <div
              key={ind}
              className="mt-6 p-4 border rounded shadow bg-gray-50"
            >
              <p>
                <strong>Platform:</strong> {ele.platform}
              </p>
              <p>
                <strong>Generated Post:</strong>
              </p>
              <p className="mt-2 whitespace-pre-line">{ele.post}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
