export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "AUTHOR" | "READER";
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  tags: string[];
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  body: string;
  postId: string;
  authorId: string;
  createdAt: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  tags?: string[];
  published?: boolean;
  authorId: string;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  tags?: string[];
  published?: boolean;
}

export interface CreateCommentInput {
  body: string;
  postId: string;
  authorId: string;
}

export interface PostsFilter {
  published?: boolean;
  authorId?: string;
  tag?: string;
  search?: string;
}

export interface PaginationInput {
  limit?: number;
  offset?: number;
}

export interface PostsConnection {
  nodes: Post[];
  totalCount: number;
  hasNextPage: boolean;
}
