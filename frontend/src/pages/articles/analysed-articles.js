import { useState, useEffect } from "react";
import Link from "next/link";

export default function AnalysedArticles() {
  const [articles, setArticles] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");

  // Fetch analyzed articles on mount
  useEffect(() => {
    const fetchAnalysedArticles = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/all-analyses`);
        if (!response.ok) {
          throw new Error("Failed to fetch analysed articles");
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAnalysedArticles();
  }, []);

  // Total items and pagination logic
  const totalItems = articles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedArticles = articles.slice(startIndex, startIndex + itemsPerPage);

  // Pagination controls
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

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  return (
    <div className="container">
      <h1>Analysed Articles</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {articles.length === 0 ? (
        <p>No analysed articles found.</p>
      ) : (
        <>
          {/* Pagination Info and Items per page */}
          <div className="articles-header">
            <p>
              {startIndex + 1} - {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} items found
            </p>
            <div className="items-per-page">
              <label>Items per page: </label>
              <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          {/* Article List */}
          <div className="articles-list">
            {selectedArticles.map((article) => (
              <div key={article._id} className="article-item">
                <h2>{article.title}</h2>
                <p><strong>Author:</strong> {article.author}</p>
                <p><strong>Publication Date:</strong> {article.publicationDate}</p>
                <p><strong>DOI:</strong> <a href={`https://doi.org/${article.DOI}`} target="_blank" rel="noopener noreferrer">{article.DOI}</a></p>
                <p><strong>Practice:</strong> {article.practice}</p>
                <p><strong>Claim:</strong> {article.claim}</p>
                <p><strong>Result:</strong> {article.result}</p>
                <p><strong>Analysis Date:</strong> {article.createdAt}</p>
                <p><strong>Link:</strong> <a href={`https://doi.org/${article.DOI}`} target="_blank" rel="noopener noreferrer">View Article</a></p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        .container {
          background-color: #333;
          color: white;
          min-height: 100vh;
          padding: 2rem;
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
          background-color: #fff;
          color: #000;
          padding: 1rem;
          border-radius: 8px;
        }
        .article-item {
          margin-bottom: 1rem;
          padding: 1rem;
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 5px;
        }
        .article-item:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        .pagination-controls {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        }
        .pagination-controls button {
          padding: 0.5rem 1rem;
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.1);
          border: none;
          color: white;
        }
        .pagination-controls span {
          align-self: center;
        }
      `}</style>
    </div>
  );
}
