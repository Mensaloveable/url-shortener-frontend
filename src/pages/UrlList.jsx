import { useEffect, useState } from "react";
import axios from "axios";

const UrlList = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const backend_url = import.meta.env.VITE_BACKEND_BASE_URL;

  // Fetch all URLs
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get(`${backend_url}/urls`);
        setUrls(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Error fetching URLs");
        }
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  // Delete a URL by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/urls/${id}`);
      setUrls(urls.filter((url) => url._id !== id)); // Remove the deleted URL from the UI
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Error deleting URL");
      }
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-600 mt-6">{error}</p>;

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        All Shortened URLs
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full max-w-4xl mx-auto bg-base-100 shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="bg-base-300">Original URL</th>
              <th className="bg-base-300">Shortened URL</th>
              <th className="bg-base-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id} className="hover:bg-base-200">
                <td>{url.originalUrl}</td>
                <td>
                  <a
                    href={`${backend_url}/${url.shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {url.shortUrl}
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(url._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrlList;
