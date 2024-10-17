import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [filteredArticles, setFilteredArticles] = useState([]); // State for filtered articles

  const totalItems = filteredArticles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
        if (!res.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await res.json();
        setArticles(data);
        setFilteredArticles(data); // Initially, all articles are displayed
      } catch (error) {
        console.error("Error fetching articles: ", error);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.publicationDate
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        article.DOI.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  // Handle search submission when the user presses 'Enter'
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  // Handle resetting the search and displaying all articles
  const handleViewAll = () => {
    setSearchTerm(""); // Clear the search term
    setFilteredArticles(articles); // Reset to all articles
    setCurrentPage(1); // Reset to the first page
  };

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
  const selectedArticles = filteredArticles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="container">
      <div className="main-content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown} // Trigger search on 'Enter'
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleViewAll} disabled={searchTerm === ""}>
            View All
          </button>
        </div>

        <div className="articles-section">
          <div className="articles-header">
            <p>
              {totalItems === 0 ? 0 : startIndex + 1} -{" "}
              {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}{" "}
              items found
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

          <div className="articles-list">
            {selectedArticles.map((article, index) => (
              <Link
                key={index}
                href={`/articles/${article._id}`}
                legacyBehavior
              >
                <div key={index} className="article-item">
                  <h2>{article.title}</h2>
                  <p>Published: {article.publicationDate}</p>
                  <p>By: {article.author}</p>
                  <p>
                    DOI:{" "}
                    <a
                      href={`https://doi.org/${article.DOI}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.DOI}
                    </a>
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="pagination-controls">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalItems === 0 ? 1 : totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalItems === 0}
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
          min-width: 100vw;
        }
        .search-bar {
          padding: 1rem 0;
          display: flex;
          gap: 10px;
        }
        .search-bar input {
          padding: 0.5rem;
          flex-grow: 1;
          border-radius: 4px;
          border: 1px solid #ccc;
          color: black;
        }
        .search-bar button {
          padding: 0.5rem 1rem;
          background-color: darkslategrey;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }
        .search-bar button:disabled {
          background-color: #d3d3d3;
          cursor: not-allowed;
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
          max-height: 85vh;
          overflow-y: auto;
        }
        .articles-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .articles-list {
          overflow-y: auto;
          max-height: 100%;
        }
        .article-item {
          margin-bottom: 1rem;
          padding: 0.5rem;
          background-color: rgb(0, 0, 0, 0.07);
        }
        .article-item:hover {
          background-color: rgb(0, 0, 0, 0.15);
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
      `}</style>
    </div>
  );
}
