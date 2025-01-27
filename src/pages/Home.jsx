import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/shorten`,
        { originalUrl }
      );
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      // Check if the error response contains a message from the backend
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setShortUrl("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Shortened URL copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card bg-base-100 shadow-xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">URL Shortener</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter your URL here"
            className="input input-bordered w-full mb-4"
          />
          <button type="submit" className="btn btn-primary w-full">
            Shorten URL
          </button>
        </form>

        {/* Fancy URL Display */}
        {shortUrl && (
          <div className="mt-6 w-full">
            <div className="bg-base-200 p-4 rounded-lg">
              <p className="text-sm font-semibold text-gray-600">
                Original URL
              </p>
              <p className="text-gray-800 break-words">{originalUrl}</p>
            </div>
            <div className="bg-base-200 p-4 rounded-lg mt-4">
              <p className="text-sm font-semibold text-gray-600">
                Shortened URL
              </p>
              <div className="flex items-center justify-between">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-words"
                >
                  {shortUrl}
                </a>
                <button onClick={handleCopy} className="btn btn-sm btn-ghost">
                  <FontAwesomeIcon
                    icon={faCopy}
                    className="text-gray-600 hover:text-blue-600"
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-4 bg-error text-error-content p-4 rounded-lg text-center">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
