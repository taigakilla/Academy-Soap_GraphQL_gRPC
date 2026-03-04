import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_TRENDING } from "../graphql/operations";
import { Post } from "../types";

export function TrendingPage() {
  const { data, loading, error } = useQuery<{ trendingPosts: Post[] }>(
    GET_TRENDING,
    { variables: { limit: 10 } }
  );

  if (loading) return <div className="loading">Carregando trending...</div>;
  if (error) return <div className="error">Erro: {error.message}</div>;

  const posts = data?.trendingPosts ?? [];

  return (
    <div className="page">
      <div className="page-header">
        <h1>🔥 Posts em Alta</h1>
      </div>

      <div className="trending-list">
        {posts.map((post: Post, index: number) => (
          <div key={post.id} className="trending-item">
            <span className="trending-rank">#{index + 1}</span>
            <div className="trending-info">
              <Link to={`/post/${post.id}`} className="trending-title">
                {post.title}
              </Link>
              <div className="trending-meta">
                <span>👤 {post.author?.name}</span>
                <span>👁 {post.viewCount} views</span>
                <span>💬 {post.commentCount} comentários</span>
              </div>
              <div className="tags">
                {post.tags?.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
