import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Article } from '../../types/Article';
import Link from 'next/link';

const ArticleDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [email, setEmail] = useState<string>('');  // Set the type for email state
  const [article, setArticle] = useState<Article | null>(null);  // Explicitly define article state
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);  // Error type

  const checkLoginState = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setEmail(payload.username);
    } else {
      setEmail('');
    }
  };

  useEffect(() => {
    checkLoginState();
    if (id) {
      const fetchArticle = async () => {
        try {
          console.log(`Fetching article with id: ${id}`);
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch article. Status: ${response.status}`);
          }

          const data: Article = await response.json();  // Explicitly define response as type Article
          setArticle(data);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchArticle();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div>Loading article...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="container">
      <div className="article-details">
        <h1 className="title">{article.title}</h1>
        <p><strong>Author:</strong> {article.author}</p>
        <p><strong>Publication Date:</strong> {article.publicationDate}</p>
        <p><strong>DOI:</strong> {article.DOI}</p>
        <p><strong>Abstract:</strong> {article.abstract}</p>
        <p><strong>Upload Date:</strong> {article.uploadDate}</p>
        <Link href={`https://doi.org/${article.DOI}`} className="doi-link" target="_blank" rel="noopener noreferrer">
          Read Full Article
        </Link>
        <br />
        {email === 'gifyevalmu@gufum.com' && (
          <Link href={`/articles/${id}/analysis`} className="analysis-link">
            Add Analysis
          </Link>
        )}

        <section className="reviews-section">
          <h2 className="reviews-title">Article Reviews</h2>
          <p className="reviews-placeholder">Reviews section will be here...</p>
        </section>
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 1.5rem;
          background-color: #333;
          color: white;
          border-radius: 10px;
        }
        .article-details {
          background-color: #fff;
          color: #000;
          padding: 1.5rem;
          border-radius: 10px;
        }
        .title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
        }
        p {
          margin-bottom: 0.5rem;
        }
        .doi-link {
          display: block;
          margin-top: 1rem;
          color: #1e90ff;
          text-decoration: underline;
        }
        .analysis-link {
          display: block;
          margin-top: 1rem;
          color: #32cd32;
          text-decoration: underline;
        }
        .reviews-section {
          margin-top: 2rem;
        }
        .reviews-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .reviews-placeholder {
          color: #777;
        }
        .loading, .error, .not-found {
          text-align: center;
          margin-top: 2rem;
        }
        .error {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default ArticleDetail;
