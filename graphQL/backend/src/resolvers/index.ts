import { GraphQLError } from "graphql";
import {
  comments,
  generateCommentId,
  generatePostId,
  nowInBrazilISO,
  posts,
  users,
} from "../data/store";
import type {
  CreateCommentInput,
  CreatePostInput,
  PaginationInput,
  Post,
  PostsFilter,
  UpdatePostInput,
} from "../types";

export const resolvers = {
  // -------------------------------------------------------
  // QUERY RESOLVERS
  // -------------------------------------------------------
  Query: {
    users: () => users,

    user: (_: unknown, { id }: { id: string }) => {
      users.find((u) => u.id === id) ?? null;
    },

    posts: (
      _: unknown,
      {
        filter,
        pagination,
      }: { filter?: PostsFilter; pagination?: PaginationInput },
    ) => {
      let filtered = [...posts];

      if (filter) {
        if (filter.published !== undefined) {
          filtered = filtered.filter((p) => p.published === filter.published);
        }

        if (filter.authorId != null) {
          filtered = filtered.filter((p) => p.authorId === filter.authorId);
        }

        if (filter.tag != null) {
          filtered = filtered.filter((p) =>
            p.tags.includes(filter.tag as string),
          );
        }

        if (filter.search != null && filter.search.trim() !== "") {
          const term = filter.search.toLowerCase();
          filtered = filtered.filter(
            (p) =>
              p.title.toLowerCase().includes(term) ||
              p.content.toLowerCase().includes(term),
          );
        }
      }

      const totalCount = filtered.length;
      const offset = pagination?.offset ?? 0;
      const limit = pagination?.limit ?? totalCount;
      const nodes = filtered.slice(offset, offset + limit);
      const hasNextPage = offset + limit < totalCount;

      return {
        nodes,
        totalCount,
        hasNextPage,
      };
    },

    post: (_: unknown, { id }: { id: string }) => {
      posts.find((p) => p.id === id) ?? null;
    },

    trendingPosts: (_: unknown, { limit }: { limit?: number }) => {
      const sorted = [...posts].sort((a, b) => b.viewCount - a.viewCount);
      return limit !== null ? sorted.slice(0, limit) : sorted;
    },

    postsByAuthor: (_: unknown, { authorId }: { authorId: string }) => {
      posts.filter((p) => p.authorId === authorId) ?? null;
    },

    commentsByPost: (_: unknown, { postId }: { postId: string }) => {
      comments.filter((c) => c.postId === postId);
    },
  },

  // -------------------------------------------------------
  // MUTATION RESOLVERS
  // -------------------------------------------------------
  Mutation: {
    createPost: (_: unknown, { input }: { input: CreatePostInput }) => {
      const { title, content, tags, published, authorId } = input;
      const now = nowInBrazilISO();
      const author = users.find((u) => u.id === authorId) ?? null;

      if (!author || author.role !== "AUTHOR") {
        throw new GraphQLError(`Autor com id ${authorId} não encontrado`, {
          extensions: { code: "NOT_FOUND" },
        });
      }

      const newPost: Post = {
        id: generatePostId(),
        title: title,
        content: content,
        published: published ?? false,
        authorId: authorId,
        tags: tags ?? [],
        viewCount: 0,
        createdAt: now,
        updatedAt: now,
      };

      posts.push(newPost);
      return newPost;
    },

    updatePost: (
      _: unknown,
      { id, input }: { id: string; input: UpdatePostInput },
    ) => {
      const post = posts.find((p) => p.id === id) ?? null;

      if (!post) {
        throw new GraphQLError(`Post com id ${id} não encontrado`, {
          extensions: { code: "NOT_FOUND" },
        });
      }

      if (input.title !== undefined) post.title = input.title;
      if (input.content !== undefined) post.content = input.content;
      if (input.tags !== undefined) post.tags = input.tags;
      if (input.published !== undefined) post.published = input.published;
      post.updatedAt = nowInBrazilISO();

      return post;
    },

    deletePost: (_: unknown, { id }: { id: string }) => {
      const index = posts.findIndex((p) => p.id === id);

      if (index === -1) return false;

      posts.splice(index, 1);
      return true;
    },

    createComment: (_: unknown, { input }: { input: CreateCommentInput }) => {
      const { body, postId, authorId } = input;

      const now = nowInBrazilISO();
      const post = posts.find((p) => p.id === postId) ?? null;

      if (!post) {
        throw new GraphQLError(`Post com id ${post} não encontrado`, {
          extensions: { code: "NOT_FOUND" },
        });
      }

      const newComent = {
        id: generateCommentId(),
        body: body,
        postId: postId,
        authorId: authorId,
        createdAt: now,
      };

      comments.push(newComent);
      return newComent;
    },

    incrementPostView: (_: unknown, { postId }: { postId: string }) => {
      const post = posts.find((p) => p.id === postId) ?? null;

      if (!post) {
        throw new GraphQLError(`Post com id ${post} não encontrado`, {
          extensions: { code: "NOT_FOUND" },
        });
      }

      post.viewCount + 1;

      return post;
    },
  },

  Post: {
    author: (post: Post) => {
      users.find((u) => u.id === post.authorId && u.role === "AUTHOR");
    },

    comments: (post: Post) => {
      comments.filter((c) => c.postId === post.id);
    },

    commentCount: (post: Post) => {
      comments.filter((c) => c.postId === post.id).length;
    },
  },

  User: {
    posts: (user: { id: string }) => {
      posts.filter((p) => p.authorId === user.id);
    },

    postCount: (user: { id: string }) => {
      posts.filter((p) => p.authorId === user.id).length;
    },
  },

  Comment: {
    post: (comment: { postId: string }) => {
      posts.find((p) => p.id === comment.postId);
    },

    author: (comment: { authorId: string }) => {
      users.find((u) => u.id === comment.authorId && u.role === "AUTHOR");
    },
  },
};
