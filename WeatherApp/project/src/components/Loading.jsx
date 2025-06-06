import "../styles/Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Fetching weather data...</p>
    </div>
  );
};

export default Loading;
