import { useEffect, useState } from 'react';
import { getBlogs, getUserById } from '../lib/api';
import { ArticleParams, User } from '../types';


export const useBlogs = () => {
  const [blogs, setBlogs] = useState<ArticleParams[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await getBlogs({ page: 1 });
      setBlogs(response.data.results);
    };
    fetchBlogs();
  }, []);

  return { blogs };
};

export const useUsers = (blogs: ArticleParams[]) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (blogs.length > 0) {
      const fetchUsers = async () => {
        const userPromises = blogs.map((blog) => getUserById(blog.userId));
        const userResponses = await Promise.all(userPromises);
        setUsers(userResponses.map((response) => response.data));
      };
      fetchUsers();
    }
  }, [blogs]);

  return { users };
};