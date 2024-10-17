// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { Article } from '../../types/Article';
// import Link from 'next/link';

// const ArticleDetail: React.FC = () => {
//   const router = useRouter();
//   const { id } = router.query;  // 获取路由中的文章ID

//   // 初始化文章状态和加载状态
//   const [article, setArticle] = useState<Article | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // 检查 id 是否存在并且已经定义
//     if (id) {
//       const fetchArticle = async () => {
//         try {
//           console.log(`Fetching article with id: ${id}`);  // 添加调试信息，确保 id 被正确获取
//           const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`);// 向后端发送请求，获取文章数据

//           // 检查请求是否成功
//           if (!response.ok) {
//             throw new Error(`Failed to fetch article. Status: ${response.status}`);
//           }

//           const data = await response.json();
//           console.log('Fetched article data:', data);  // 添加调试信息，查看返回的数据
//           setArticle(data);  // 设置文章数据
//         } catch (err) {
//           // Type guard to check if the error is an instance of Error
//           if (err instanceof Error) {
//             setError(err.message); // Access the message property safely
//           } else {
//             setError('An unknown error occurred'); // Handle cases where it's not an Error object
//           }
//         } finally {
//           setLoading(false);  // 停止加载状态
//         }
//       };

//       fetchArticle();
//     } else {
//       setLoading(false);  // 如果 id 不存在，直接停止加载状态
//     }
//   }, [id]);  // 监听 id 的变化，确保路由变化时重新加载数据

//   // 显示加载状态
//   if (loading) {
//     return <div>Loading article...</div>;
//   }

//   // 如果出现错误，显示错误信息
//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   // 如果文章未找到，返回提示信息
//   if (!article) {
//     return <div>Article not found</div>;
//   }

//   // 渲染文章详细信息
//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
//       <p><strong>Author:</strong> {article.author}</p>
//       <p><strong>Publication Date:</strong> {article.publicationDate}</p>
//       <p><strong>DOI:</strong> {article.DOI}</p>
//       <p><strong>Abstract:</strong> {article.abstract}</p>
//       <p><strong>Upload Date:</strong> {article.uploadDate}</p>
//       <Link href={article.link} className="text-blue-500 underline mt-4 block" target="_blank" rel="noopener noreferrer">
//         Read Full Article
//       </Link>

//       {/* 文章评论区 */}
//       <section className="mt-8">
//         <h2 className="text-xl font-semibold mb-2">Article Reviews</h2>
//         <p className="text-gray-500">Reviews section will be here...</p>
//       </section>
//     </div>
//   );
// };

// export default ArticleDetail;
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Article } from '../../types/Article';
import Link from 'next/link';

const ArticleDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 评论相关状态
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  // 排序方式的状态
  const [sortMethod, setSortMethod] = useState<string>('recent');  // 默认按照最近的评论排序

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch article. Status: ${response.status}`);
          }
          const data = await response.json();
          setArticle(data);
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

      const fetchReviews = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}/reviews`);
          if (!response.ok) {
            throw new Error(`Failed to fetch reviews. Status: ${response.status}`);
          }
          const data = await response.json();
          setReviews(data);
        } catch (err) {
          console.error('Failed to fetch reviews:', err.message);
        }
      };

      fetchArticle();
      fetchReviews();
    } else {
      setLoading(false);
    }
  }, [id]);

  const submitReview = async () => {
    if (!newReview || rating === 0) {
      alert('Please enter a review and select a rating.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review: newReview, rating }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const addedReview = await response.json();
      setReviews([addedReview, ...reviews]);  // 插入新的评论
      setNewReview('');
      setRating(0);
    } catch (err) {
      console.error('Error submitting review:', err.message);
    }
  };

  // 处理排序
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortMethod === 'recent') {
      // 按最近时间排序
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortMethod === 'highest') {
      // 按最高评分排序
      return b.rating - a.rating;
    }
    return 0;
  });

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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      <p><strong>Author:</strong> {article.author}</p>
      <p><strong>Publication Date:</strong> {article.publicationDate}</p>
      <p><strong>DOI:</strong> {article.DOI}</p>
      <p><strong>Abstract:</strong> {article.abstract}</p>
      <p><strong>Upload Date:</strong> {article.uploadDate}</p>

      <Link href={article.link}>
        <span className="text-blue-500 underline mt-4 block" target="_blank" rel="noopener noreferrer">
          Read Full Article
        </span>
      </Link>

      {/* 评论区 */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Submit a Review</h2>
        <textarea
          className="w-full p-2 border"
          placeholder="Write your review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <select
          className="mt-2 p-2"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
        >
          <option value={0}>Select Rating</option>
          <option value={1}>1 - Poor</option>
          <option value={2}>2 - Fair</option>
          <option value={3}>3 - Good</option>
          <option value={4}>4 - Very Good</option>
          <option value={5}>5 - Excellent</option>
        </select>
        <button className="mt-4 bg-blue-500 text-white p-2" onClick={submitReview}>
          Submit Review
        </button>

        {/* 排序选择 */}
        <div className="mt-4">
          <label htmlFor="sort-method" className="mr-2">Sort by:</label>
          <select
            id="sort-method"
            value={sortMethod}
            onChange={(e) => setSortMethod(e.target.value)}
            className="p-2 border"
          >
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rating</option>
          </select>
        </div>

        {/* 显示评论 */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Reviews</h2>
        {sortedReviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          sortedReviews.map((review, index) => (
            <div key={index} className="p-4 border rounded mt-2">
              <p>{review.review}</p>
              <p>Rating: {review.rating}/5</p>
              <p>Posted on: {new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default ArticleDetail;
