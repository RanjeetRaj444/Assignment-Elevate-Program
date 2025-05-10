export default function Search({
  search,
  setSearch,
  sortType,
  setSortType,
  onClear,
}) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        value={search}
        placeholder="Search by name"
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <div className="flex items-center gap-4">
        <label className="text-sm">Sort by:</label>
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="recent">Most Recent</option>
          <option value="rating">Highest Rating</option>
        </select>
        <button onClick={onClear} className="ml-auto text-red-600 underline">
          Clear All
        </button>
      </div>
    </div>
  );
}
