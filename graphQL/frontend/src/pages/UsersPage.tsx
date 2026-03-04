import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_USERS } from "../graphql/operations";
import { User } from "../types";

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "👑 Admin",
  AUTHOR: "✍️ Autor",
  READER: "👁 Leitor",
};

export function UsersPage() {
  const { data, loading, error } = useQuery<{ users: User[] }>(GET_USERS);

  if (loading) return <div className="loading">Carregando usuários...</div>;
  if (error) return <div className="error">Erro: {error.message}</div>;

  const users = data?.users ?? [];

  return (
    <div className="page">
      <div className="page-header">
        <h1>👥 Usuários</h1>
      </div>

      <div className="users-grid">
        {users.map((user: User) => (
          <div key={user.id} className="card user-card">
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="card-title">{user.name}</h2>
            <p className="user-email">{user.email}</p>
            <span className="user-role">{ROLE_LABELS[user.role] ?? user.role}</span>

            <div className="user-stats">
              <span>📝 {user.postCount ?? 0} posts</span>
            </div>

            {user.posts && user.posts.length > 0 && (
              <div className="user-posts">
                <strong>Posts recentes:</strong>
                <ul>
                  {user.posts.slice(0, 3).map((post) => (
                    <li key={post.id}>
                      <Link to={`/post/${post.id}`}>{post.title}</Link>
                      <span className="post-views"> 👁 {post.viewCount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="user-since">
              Membro desde: {new Date(user.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
