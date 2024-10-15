import { useEffect, useState } from 'react';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading articles...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Articles</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publication Date</th>
            <th>DOI</th>
            <th>Abstract</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={index}>
              <td>{article.title}</td>
              <td>{article.author}</td>
              <td>{new Date(article.publicationDate).toLocaleDateString()}</td>
              <td>
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${article.DOI}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.DOI}
                </a>
              </td>
              <td>{article.abstract}</td>
              <td>
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  Full Article
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .container {
          padding: 2rem;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th,
        td {
          padding: 1rem;
          border: 1px solid #ccc;
        }
        th {
          background-color: #f4f4f4;
        }
        a {
          color: #0070f3;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
