import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = 100; // Assume there are 100 articles for now
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startItemIndex = (currentPage - 1) * itemsPerPage + 1;
  const endItemIndex = Math.min(startItemIndex + itemsPerPage - 1, totalItems);

  return (
    <div className="container">
      {/* Main content container */}
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
              Showing {startItemIndex} - {endItemIndex} of {totalItems} articles
            </p>
            <div className="items-per-page">
              <label>Articles per page: </label>
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
            {[...Array(itemsPerPage)].map((_, index) => {
              const articleId = startItemIndex + index; // Generate a unique article ID for each article
              return (
                <div key={articleId} className="article-item">
                  <Link href={`/article/${articleId}`}>
                    {" "}
                    {/* May need to alter this link according to the way articles are routed */}
                    <h2>Article Title {articleId}</h2>
                  </Link>
                  <p>Published: Article Publish Date</p>
                  <p>By: Article Author</p>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="pagination-controls">
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
