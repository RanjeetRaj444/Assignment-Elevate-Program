let options = [
  { value: "Fiction", label: "Fiction" },
  { value: "Non-Fiction", label: "Non-Fiction" },
  { value: "Biography", label: "Biography" },
  { value: "Thriller", label: "Thriller" },
];

function FilterBar({ books, setFiltered }) {
  const handleFilter = (e) => {
    const value = e.target.value;
    if (value === "All") setFiltered(books);
    else setFiltered(books.filter((b) => b.genre === value));
  };

  const handleSort = (e) => {
    const value = e.target.value;
    const sorted = [...books].sort((a, b) => {
      if (value === "Title") return a.title.localeCompare(b.title);
      else return a.price - b.price;
    });
    setFiltered(sorted);
  };

  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
      <select
        className="flex justify-center align-middle bg-gray-300 pt-2 pb-2 pl-3 pr-3 rounded"
        onChange={handleFilter}
      >
        <option value="All">All</option>
        {options.map((g) => (
          <option key={g.value} value={g.value}>
            {g.label}
          </option>
        ))}
      </select>
      <select
        onChange={handleSort}
        className="flex justify-center align-middle bg-gray-300 pt-2 pb-2 pl-3 pr-3 rounded"
      >
        <option value="Title">Sort by Title</option>
        <option value="Price">Sort by Price</option>
      </select>
    </div>
  );
}

export default FilterBar;
