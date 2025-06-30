import { useEffect, useState } from "react";
import Card from "./components/Card";

function App() {
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const limit = 5;

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const filteredData = allData.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / limit);
  const indexOfLast = page * limit;
  const indexOfFirst = indexOfLast - limit;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className="heading text-center p-4">
        <h1 className="text-3xl font-bold mb-4">Product Listing</h1>
        <div className="searchbox flex justify-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 px-4 py-2 w-80 rounded"
          />
        </div>
      </div>

      <div className="card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
        {currentData.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination-container flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded ${
                page === idx + 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
