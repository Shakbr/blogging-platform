import pool from '../config/dbConfig';

export interface Post {
  postID?: number;
  title: string;
  content: string;
  userID: number;
}

export const createPost = async (post: Post): Promise<void> => {
  const query = 'INSERT INTO Posts (Title, Content, UserID) VALUES (?, ?, ?)';
  await pool.execute(query, [post.title, post.content, post.userID]);
};
