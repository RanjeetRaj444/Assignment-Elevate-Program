import React, { useEffect, useState } from "react";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  let start = (page - 1) * 10;
  let end = start + 10;
  let paginatedData = data.slice(start, end);
  let maxPage = Math.ceil(data.length / 10);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);
  return (
    <div>
      {paginatedData.length > 0 &&
        paginatedData.map((ele, ind) => (
          <p key={ind}>
            {start + (ind + 1)} :- {ele.title}
          </p>
        ))}
      <div
        className="pagination-container"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        .
        <button disabled={page == 1} onClick={() => setPage((pre) => pre - 1)}>
          Prev
        </button>
        <p>{page}</p>
        <button
          disabled={page == maxPage}
          onClick={() => setPage((pre) => pre + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
