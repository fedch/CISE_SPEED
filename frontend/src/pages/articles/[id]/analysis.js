import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Analysis() {
  const [practice, setPractice] = useState('');
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState('agree');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [article, setArticle] = useState(null);
  const router = useRouter();

  // Fetch article data on mount
  useEffect(() => {
    if (router.query.id) {
      const fetchArticle = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${router.query.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch article');
          }
          const data = await response.json();
          setArticle(data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchArticle();
    }
  }, [router.query.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/articles/${router.query.id}/analysis`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            title: article.title,
            author: article.author,
            publicationDate: article.publicationDate,
            DOI: article.DOI,
            abstract: article.abstract,
            uploadDate: article.uploadDate,
            link: `https://doi.org/${article.DOI}`,
            practice, 
            claim, 
            result }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add analysis');
      }

      // Redirect back to the article page after successful submission
      router.push(`/articles/${router.query.id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Add Analysis to</h1>

      {/* Display article details */}
      {article && (
        <div className="article-details">
          <h2>{article.title}</h2>
          <p><strong>Author:</strong> {article.author}</p>
          <p><strong>Publication Date:</strong> {article.publicationDate}</p>
          <p><strong>DOI:</strong> {article.DOI}</p>
          <p><strong>Abstract:</strong> {article.abstract}</p>
          <p><strong>Upload Date:</strong> {article.uploadDate}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="practice">Practice:</label>
          <input
            type="text"
            id="practice"
            value={practice}
            onChange={(e) => setPractice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="claim">Claim:</label>
          <input
            type="text"
            id="claim"
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="result">Result:</label>
          <select
            id="result"
            value={result}
            onChange={(e) => setResult(e.target.value)}
          >
            <option value="agree">Agree</option>
            <option value="disagree">Disagree</option>
            <option value="neutral">Neutral</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Add Analysis'}
        </button>
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      </form>
    </div>
  );
}
