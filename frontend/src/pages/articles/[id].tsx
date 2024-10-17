import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Article } from '../../types/Article';
import Link from 'next/link';

const ArticleDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;  // 获取路由中的文章ID
  const [email, setEmail] = useState('');

  // 初始化文章状态和加载状态
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Change that to only check if an analyst
  // Function to check token and set login state
  const checkLoginState = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
      setEmail(payload.username);
    } else {
      setEmail(''); // Clear email if not logged in
    }
  };

  useEffect(() => {
    checkLoginState();
    // 检查 id 是否存在并且已经定义
    if (id) {
      const fetchArticle = async () => {
        try {
          console.log(`Fetching article with id: ${id}`);  // 添加调试信息，确保 id 被正确获取
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`);// 向后端发送请求，获取文章数据

          // 检查请求是否成功
          if (!response.ok) {
            throw new Error(`Failed to fetch article. Status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Fetched article data:', data);  // 添加调试信息，查看返回的数据
          setArticle(data);  // 设置文章数据
        } catch (err) {
          // Type guard to check if the error is an instance of Error
          if (err instanceof Error) {
            setError(err.message); // Access the message property safely
          } else {
            setError('An unknown error occurred'); // Handle cases where it's not an Error object
          }
        } finally {
          setLoading(false);  // 停止加载状态
        }
      };

      fetchArticle();
    } else {
      setLoading(false);  // 如果 id 不存在，直接停止加载状态
    }
  }, [id]);  // 监听 id 的变化，确保路由变化时重新加载数据

  // 显示加载状态
  if (loading) {
    return <div>Loading article...</div>;
  }

  // 如果出现错误，显示错误信息
  if (error) {
    return <div>Error: {error}</div>;
  }

  // 如果文章未找到，返回提示信息
  if (!article) {
    return <div>Article not found</div>;
  }

  // 渲染文章详细信息
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      <p><strong>Author:</strong> {article.author}</p>
      <p><strong>Publication Date:</strong> {article.publicationDate}</p>
      <p><strong>DOI:</strong> {article.DOI}</p>
      <p><strong>Abstract:</strong> {article.abstract}</p>
      <p><strong>Upload Date:</strong> {article.uploadDate}</p>
      <Link href={`https://doi.org/${article.DOI}`} className="text-blue-500 underline mt-4 block" target="_blank" rel="noopener noreferrer">
        Read Full Article
      </Link>
      {/* Link to a page with analysis */}
      {email === 'gifyevalmu@gufum.com' && (
      <Link href={`/articles/${id}/analysis`} className="text-blue-500 underline mt-4 block">
        Add Analysis
      </Link>
      )}

      {/* 文章评论区 */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Article Reviews</h2>
        <p className="text-gray-500">Reviews section will be here...</p>
      </section>
    </div>
  );
};

export default ArticleDetail;
