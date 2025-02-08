import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import UrlList from "./pages/UrlList";

const App = () => {
  return (
    <Router>
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-center space-x-4">
          <Link to="/" className="text-white font-semibold hover:underline">
            Home
          </Link>
          <Link to="/urls" className="text-white font-semibold hover:underline">
            All URLs
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/urls" element={<UrlList />} />
      </Routes>
    </Router>
  );
};

export default App;
