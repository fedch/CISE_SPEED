import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  // Default the articles to an empty array to avoid undefined issues
  const [articles, setArticles] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  console.log(articles); // Add this to inspect the data

  // Total items and pages calculation
  const totalItems = articles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Fetch articles from the MongoDB API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("http://localhost:8082/articles"); // This should match your controller path
        if (!res.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles: ", error);
      }
    };
    fetchArticles();
  }, []); // Empty array ensures the effect runs only once when the component mounts

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  // Pagination logic
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedArticles = articles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>LOGO</h1>
        <div className="nav-links">
          <Link href="/signup" legacyBehavior>
            <a>Sign up</a>
          </Link>
          <Link href="/login" legacyBehavior>
            <a>Login</a>
          </Link>
          <Link href="/new-article" legacyBehavior>
            <a>New Article</a>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <div className="main-content">
        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Enter search here" />
          <button>Search</button>
        </div>

        {/* Articles Section */}
        <div className="articles-section">
          <div className="articles-header">
            <p>
              {startIndex + 1} -{" "}
              {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}{" "}
              items found
            </p>
            <div className="items-per-page">
              <label>Items per page: </label>
              <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          {/* Article List */}
          <div className="articles-list">
            {selectedArticles.map((article, index) => (
              <div key={index} className="article-item">
                <Link href={`/articles/${article.id}`} legacyBehavior>
                  <a>
                    <h2>{article.title}</h2>
                    <p>Published: {article.publishDate}</p>
                    <p>By: {article.author}</p>
                  </a>
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          background-color: #333;
          color: white;
          min-height: 100vh;
          padding: 1rem;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
        }
        .nav-links a {
          color: white;
          margin-left: 1rem;
        }
        .search-bar {
          padding: 1rem 0;
        }
        .search-bar input {
          padding: 0.2rem;
          width: 60%;
        }
        .search-bar button {
          padding: 0.5rem 1rem;
          margin-left: 1rem;
        }
        .main-content {
          width: 80%;
          max-width: 1200px;
          margin: auto;
          justify-content: center;
          padding: 1rem;
        }
        .articles-section {
          background-color: #fff;
          color: #000;
          border-radius: 8px;
          padding: 1rem;
          max-height: 90vh;
          overflow-y: auto;
        }
        .articles-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .items-per-page select {
          margin-left: 0.5rem;
        }
        .articles-list {
          overflow-y: auto;
          max-height: 100%;
        }
        .article-item {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          background-color: rgb(0, 0, 0, 0.07);
        }
        .article-item h2 {
          font-size: 20px;
          font-weight: bold;
        }
        .article-item a {
          color: #0070f3;
          text-decoration: none;
        }
        .article-item a:hover {
          text-decoration: underline;
        }
        .pagination-controls {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        }
        .pagination-controls button {
          padding: 0.1rem 1rem;
          cursor: pointer;
          border: 1px black solid;
          background-color: rgb(0, 0, 0, 0.05);
        }
        .pagination-controls span {
          align-self: center;
        }
      `}</style>
    </div>
  );
}

{
  /* <style jsx>{`
        .container {
          background-color: #333;
          color: white;
          min-height: 100vh;
          padding: 1rem;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
        }
        .nav-links a {
          color: white;
          margin-left: 1rem;
        }
        .search-bar {
          padding: 1rem 0;
        }
        .search-bar input {
          padding: 0.2rem;
          width: 60%;
        }
        .search-bar button {
          padding: 0.5rem 1rem;
          margin-left: 1rem;
        }
        .main-content {
          width: 80%;
          max-width: 1200px;
          margin: auto;
          justify-content: center;
          padding: 1rem;
        }
        .articles-section {
          background-color: #fff;
          color: #000;
          border-radius: 8px;
          padding: 1rem;
          max-height: 90vh;
          overflow-y: auto;
        }
        .articles-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .items-per-page select {
          margin-left: 0.5rem;
        }
        .articles-list {
          overflow-y: auto;
          max-height: 100%;
        }
        .article-item {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          background-color: rgb(0, 0, 0, 0.07);
        }
        .article-item h2 {
          font-size: 20px;
          font-weight: bold;
        }
        .article-item a {
          color: #0070f3;
          text-decoration: none;
        }
        .article-item a:hover {
          text-decoration: underline;
        }
        .pagination-controls {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        }
        .pagination-controls button {
          padding: 0.1rem 1rem;
          cursor: pointer;
          border: 1px black solid;
          background-color: rgb(0, 0, 0, 0.05);
        }
        .pagination-controls span {
          align-self: center;
        }
      `}</style> */
}
