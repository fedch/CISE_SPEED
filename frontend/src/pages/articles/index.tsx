import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // 使用 Next.js 的 Link 组件
import { Article } from '../../types/Article';

const Articles: React.FC = () => {
  // Define the state for an array of articles
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Article[] = await response.json(); // Make sure the data is an array of articles
        setArticles(data); // Set the articles state with the fetched data
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading articles...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Articles</h1>
      <ul className="space-y-6">
        {articles.map((article) => (
          <li key={article.DOI} className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800">{article.title}</h2>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Author:</strong> {article.author} | <strong>Published:</strong> {article.publicationDate}
            </p>
            <p className="text-gray-700 mt-4">{article.abstract}</p>
            {/* 使用 Next.js 的 Link 组件来导航到动态路由页面 */}
            <Link href={`/articles/${article.DOI}`} className="inline-block mt-4 text-blue-500 hover:underline">
              Read more →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
