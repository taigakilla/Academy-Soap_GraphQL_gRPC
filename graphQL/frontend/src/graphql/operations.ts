import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($filter: PostsFilter, $pagination: PaginationInput) {
    posts(filter: $filter, pagination: $pagination) {
      totalCount
      hasNextPage
      nodes {
        id
        title
        content
        published
        createdAt
        viewCount
        tags
        commentCount
        author {
          id
          name
          role
        }
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
      published
      tags
      viewCount
      createdAt
      updatedAt
      author {
        id
        name
        email
        role
        postCount
      }
      comments {
        id
        body
        createdAt
        author {
          id
          name
        }
      }
      commentCount
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      role
      createdAt
      postCount
      posts {
        id
        title
        viewCount
      }
    }
  }
`;

export const GET_TRENDING = gql`
  query GetTrending($limit: Int) {
    trendingPosts(limit: $limit) {
      id
      title
      viewCount
      tags
      author {
        name
      }
      commentCount
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      content
      published
      tags
      createdAt
      author {
        id
        name
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      body
      createdAt
      author {
        id
        name
      }
    }
  }
`;

export const INCREMENT_VIEW = gql`
  mutation IncrementView($postId: ID!) {
    incrementPostView(postId: $postId) {
      id
      viewCount
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      content
      published
      tags
      updatedAt
    }
  }
`;
