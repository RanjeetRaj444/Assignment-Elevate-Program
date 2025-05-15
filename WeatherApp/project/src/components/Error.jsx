import "../styles/Error.css";

const Error = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-icon">!</div>
      <p className="error-message">{message}</p>
    </div>
  );
};

export default Error;
