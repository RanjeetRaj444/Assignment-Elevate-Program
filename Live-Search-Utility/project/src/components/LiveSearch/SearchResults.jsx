import "./SearchResults.css";

const SearchResults = ({
  results,
  searchQuery,
  focusedIndex,
  onResultSelect,
}) => {
  const highlightMatch = (text, query) => {
    if (!query.trim()) {
      return text;
    }
    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );

    const parts = text.split(regex);
    // console.log(parts);
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="highlight">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const getDisplayText = (item) => {
    if (typeof item === "string") return item;

    if (typeof item === "object" && item !== null) {
      const displayProps = ["name", "title", "label", "text", "id", "value"];
      for (const prop of displayProps) {
        if (item[prop] !== undefined) {
          if (typeof item[prop] === "string") {
            return item[prop];
          } else {
            let newString=""
           for(let a in item[prop]){
            newString+=item[prop][a]+" "
           }
           return newString
          }
        }
      }

      return JSON.stringify(item);
    }

    return String(item);
  };

  return (
    <div className="search-results">
      <ul className="results-list">
        {results.map((result, index) => (
          <li
            key={index}
            className={`result-item ${focusedIndex === index ? "focused" : ""}`}
            onClick={() => onResultSelect(result)}
          >
            {highlightMatch(getDisplayText(result), searchQuery)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
