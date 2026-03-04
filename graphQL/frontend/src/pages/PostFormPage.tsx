import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_POST,
  UPDATE_POST,
  GET_POST,
  GET_POSTS,
} from "../graphql/operations";

const CURRENT_USER_ID = "user-2";

export function PostFormPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [published, setPublished] = useState(false);

  const { data } = useQuery<{ post: { title: string; content: string; tags: string[]; published: boolean } }>(
    GET_POST,
    { variables: { id }, skip: !isEditing }
  );

  useEffect(() => {
    if (data?.post) {
      setTitle(data.post.title);
      setContent(data.post.content);
      setTagsInput(data.post.tags.join(", "));
      setPublished(data.post.published);
    }
  }, [data]);

  const [createPost, { loading: creating }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS, variables: { filter: { published: true }, pagination: { limit: 3, offset: 0 } } }],
    onCompleted: (data) => navigate(`/post/${data.createPost.id}`),
  });

  const [updatePost, { loading: updating }] = useMutation(UPDATE_POST, {
    onCompleted: () => navigate(`/post/${id}`),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (isEditing && id) {
      await updatePost({
        variables: {
          id,
          input: { title, content, tags, published },
        },
      });
    } else {
      await createPost({
        variables: {
          input: {
            title,
            content,
            tags,
            published,
            authorId: CURRENT_USER_ID,
          },
        },
      });
    }
  };

  const loading = creating || updating;

  return (
    <div className="page page-form">
      <h1>{isEditing ? "✏️ Editar Post" : "✍️ Novo Post"}</h1>

      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label>Título *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input"
            placeholder="Título do post"
          />
        </div>

        <div className="form-group">
          <label>Conteúdo *</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={8}
            className="textarea"
            placeholder="Escreva o conteúdo do post..."
          />
        </div>

        <div className="form-group">
          <label>Tags (separadas por vírgula)</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="input"
            placeholder="graphql, typescript, tutorial"
          />
        </div>

        <div className="form-group form-check">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label htmlFor="published">Publicar imediatamente</label>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">
            Cancelar
          </button>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Salvando..." : isEditing ? "Salvar Alterações" : "Criar Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
