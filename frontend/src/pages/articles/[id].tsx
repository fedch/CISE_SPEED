import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ArticleDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;  // 获取路由中的文章ID

  // 初始化文章状态和加载状态
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 检查 id 是否存在并且已经定义
    if (id) {
      const fetchArticle = async () => {
        try {
          console.log(`Fetching article with id: ${id}`);  // 添加调试信息，确保 id 被正确获取
          const response = await fetch(`http://localhost:8082/api/articles/${id}`);// 向后端发送请求，获取文章数据

          // 检查请求是否成功
          if (!response.ok) {
            throw new Error(`Failed to fetch article. Status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Fetched article data:', data);  // 添加调试信息，查看返回的数据
          setArticle(data);  // 设置文章数据
        } catch (err) {
          setError(err.message);
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
      <a href={article.link} className="text-blue-500 underline mt-4 block" target="_blank" rel="noopener noreferrer">
        Read Full Article
      </a>

      {/* 文章评论区 */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Article Reviews</h2>
        <p className="text-gray-500">Reviews section will be here...</p>
      </section>
    </div>
  );
};

export default ArticleDetail;
