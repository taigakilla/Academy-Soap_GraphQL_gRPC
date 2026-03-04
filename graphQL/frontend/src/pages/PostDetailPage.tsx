import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POST, CREATE_COMMENT, DELETE_POST } from "../graphql/operations";
import { Post, Comment } from "../types";

const CURRENT_USER_ID = "user-4";

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [commentBody, setCommentBody] = useState("");

  const { data, loading, error } = useQuery<{ post: Post }>(GET_POST, {
    variables: { id },
    skip: !id,
  });

  const [createComment, { loading: commenting }] = useMutation(CREATE_COMMENT, {
    update(cache, { data: mutationData }) {
      const newComment = mutationData?.createComment;
      if (!newComment || !id) return;

      const existing = cache.readQuery<{ post: Post }>({
        query: GET_POST,
        variables: { id },
      });

      if (existing?.post) {
        cache.writeQuery({
          query: GET_POST,
          variables: { id },
          data: {
            post: {
              ...existing.post,
              comments: [...(existing.post.comments ?? []), newComment],
              commentCount: (existing.post.commentCount ?? 0) + 1,
            },
          },
        });
      }
    },
  });

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: () => navigate("/"),
  });

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentBody.trim() || !id) return;

    await createComment({
      variables: {
        input: {
          body: commentBody,
          postId: id,
          authorId: CURRENT_USER_ID,
        },
      },
    });

    setCommentBody("");
  };

  if (loading) return <div className="loading">Carregando post...</div>;
  if (error) return <div className="error">Erro: {error.message}</div>;
  if (!data?.post) return <div className="error">Post não encontrado</div>;

  const post = data.post;

  return (
    <div className="page page-detail">
      <div className="breadcrumb">
        <Link to="/">← Voltar para posts</Link>
      </div>

      <article className="post-article">
        <div className="post-meta-top">
          <div className="tags">
            {post.tags?.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          {!post.published && <span className="badge-draft">Rascunho</span>}
        </div>

        <h1>{post.title}</h1>

        <div className="post-meta">
          <span>👤 {post.author?.name}</span>
          <span>🏷 {post.author?.role}</span>
          <span>👁 {post.viewCount} visualizações</span>
          <span>💬 {post.commentCount} comentários</span>
          <span>📅 {new Date(post.createdAt).toLocaleDateString("pt-BR")}</span>
        </div>

        <div className="post-content">
          <p>{post.content}</p>
        </div>

        <div className="post-author-card">
          <strong>Sobre o autor</strong>
          <p>
            {post.author?.name} — {post.author?.postCount} post(s) publicado(s)
          </p>
          <p>{post.author?.email}</p>
        </div>

        <div className="post-actions">
          <Link to={`/edit/${post.id}`} className="btn btn-secondary">Editar</Link>
          <button
            onClick={() => {
              if (confirm("Deletar este post?")) deletePost({ variables: { id: post.id } });
            }}
            className="btn btn-danger"
          >
            Deletar
          </button>
        </div>
      </article>

      <section className="comments-section">
        <h2>💬 Comentários ({post.commentCount ?? 0})</h2>

        <form onSubmit={handleComment} className="comment-form">
          <textarea
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            placeholder="Escreva um comentário..."
            rows={3}
            className="textarea"
          />
          <button type="submit" disabled={commenting || !commentBody.trim()} className="btn btn-primary">
            {commenting ? "Enviando..." : "Comentar"}
          </button>
        </form>

        <div className="comments-list">
          {post.comments?.map((comment: Comment) => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <strong>{comment.author?.name ?? "Anônimo"}</strong>
                <span>{new Date(comment.createdAt).toLocaleDateString("pt-BR")}</span>
              </div>
              <p>{comment.body}</p>
            </div>
          ))}
          {(!post.comments || post.comments.length === 0) && (
            <p className="empty">Nenhum comentário ainda. Seja o primeiro!</p>
          )}
        </div>
      </section>
    </div>
  );
}
