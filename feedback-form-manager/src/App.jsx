import { useState, useRef, useEffect, useMemo } from "react";
import Form from "./components/Form";
import Search from "./components/Search";
import FeedbackList from "./components/FeedbackList";

export default function App() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const ratingRef = useRef();
  const [feedbackList, setFeedbackList] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("recent");

  const handleSubmit = (e) => {
    e.preventDefault();
    const rating = Number(ratingRef.current.value);

    if (!name.trim() || !feedback.trim()) {
      alert("Name and feedback required.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      name,
      feedback,
      rating,
      timestamp: new Date().toLocaleString(),
    };

    setFeedbackList((prev) => [newEntry, ...prev]);
    setName("");
    setFeedback("");
    ratingRef.current.value = "";
  };

  const filteredList = useMemo(() => {
    const query = search.toLowerCase();
    let filtered = feedbackList.filter((f) =>
      f.name.toLowerCase().includes(query)
    );
    if (sortType === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      filtered.sort((a, b) => b.id - a.id);
    }
    return filtered;
  }, [feedbackList, search, sortType]);

  useEffect(() => {
    if (feedbackList.length > 0) {
      console.log("New feedback added.");
    }
    return () => {
      console.log("Cleanup on unmount or feedback change.");
    };
  }, [feedbackList]);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Feedback Form Manager</h1>
      <Form
        name={name}
        feedback={feedback}
        ratingRef={ratingRef}
        setName={setName}
        setFeedback={setFeedback}
        onSubmit={handleSubmit}
      />
      <Search
        search={search}
        setSearch={setSearch}
        sortType={sortType}
        setSortType={setSortType}
        onClear={() => setFeedbackList([])}
      />
      <FeedbackList feedbackList={feedbackList} filtered={filteredList} />
    </div>
  );
}
