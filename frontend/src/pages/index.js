import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1></h1>
        <div className="nav-links">
        </div>
      </header>

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
            <p>1 - 20 of X items found</p>
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
            {[...Array(itemsPerPage)].map((_, index) => (
              <div key={index} className="article-item">
                <h2>Article Title</h2>
                <p>Published: Article Publish Date</p>
                <p>By: Article Author</p>
              </div>
            ))}
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
          width: 60%;
          margin: auto;
          justify-content: center;
          padding: 1rem;
        }
        .articles-section {
          background-color: #fff;
          color: #000;
          border-radius: 8px;
          padding: 1rem;
          max-height: 650px; /* Set a fixed height for the article section */
          overflow-y: auto; /* Enable vertical scrolling */
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
          max-height: 550px; /* Set max height for scrollable area */
        }
        .article-item {
          margin-bottom: 1rem;
          border-bottom: 1px solid #ccc;
          padding-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}
