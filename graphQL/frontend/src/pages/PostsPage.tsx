import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_POSTS, DELETE_POST, INCREMENT_VIEW } from "../graphql/operations";
import { Post, PostsConnection } from "../types";

export function PostsPage() {
  const [search, setSearch] = useState("");
  const [filterPublished, setFilterPublished] = useState<boolean | undefined>(true);
  const [page, setPage] = useState(0);
  const LIMIT = 3;

  const { data, loading, error, refetch } = useQuery<{
    posts: PostsConnection;
  }>(GET_POSTS, {
    variables: {
      filter: {
        published: filterPublished,
        search: search || undefined,
      },
      pagination: {
        limit: LIMIT,
        offset: page * LIMIT,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_POSTS, variables: { filter: { published: filterPublished }, pagination: { limit: LIMIT, offset: page * LIMIT } } }],
  });

  const [incrementView] = useMutation(INCREMENT_VIEW);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este post?")) return;
    await deletePost({ variables: { id } });
  };

  const handleView = async (id: string) => {
    await incrementView({ variables: { postId: id } });
  };

  if (loading && !data) return <div className="loading">Carregando posts...</div>;
  if (error) return <div className="error">Erro: {error.message}</div>;

  const posts = data?.posts.nodes ?? [];
  const totalCount = data?.posts.totalCount ?? 0;
  const hasNextPage = data?.posts.hasNextPage ?? false;

  return (
    <div className="page">
      <div className="page-header">
        <h1>📝 Posts</h1>
        <Link to="/create" className="btn btn-primary">+ Novo Post</Link>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Buscar posts..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
          className="input"
        />
        <select
          value={filterPublished === undefined ? "all" : String(filterPublished)}
          onChange={(e) => {
            setPage(0);
            if (e.target.value === "all") setFilterPublished(undefined);
            else setFilterPublished(e.target.value === "true");
          }}
          className="select"
        >
          <option value="true">Publicados</option>
          <option value="false">Rascunhos</option>
          <option value="all">Todos</option>
        </select>
        <button onClick={() => refetch()} className="btn btn-secondary">↻ Atualizar</button>
      </div>

      <p className="count">{totalCount} post(s) encontrado(s)</p>

      <div className="posts-grid">
        {posts.map((post: Post) => (
          <div key={post.id} className="card">
            <div className="card-header">
              <div className="tags">
                {post.tags?.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              {!post.published && <span className="badge-draft">Rascunho</span>}
            </div>

            <h2 className="card-title">{post.title}</h2>
            <p className="card-excerpt">{post.content.slice(0, 100)}...</p>

            <div className="card-meta">
              <span>👤 {post.author?.name ?? "Desconhecido"}</span>
              <span>👁 {post.viewCount ?? 0}</span>
              <span>💬 {post.commentCount ?? 0}</span>
            </div>

            <div className="card-actions">
              <Link
                to={`/post/${post.id}`}
                className="btn btn-sm"
                onClick={() => handleView(post.id)}
              >
                Ver
              </Link>
              <Link to={`/edit/${post.id}`} className="btn btn-sm btn-secondary">
                Editar
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className="btn btn-sm btn-danger"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="btn btn-secondary"
        >
          ← Anterior
        </button>
        <span>Página {page + 1}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasNextPage}
          className="btn btn-secondary"
        >
          Próxima →
        </button>
      </div>
    </div>
  );
}
