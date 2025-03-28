'use client';

import React, { createContext, useContext, useState } from 'react';

import { Post } from '../types';
import axios from 'axios';

interface PostContextProps {
    posts: Post[];
    fetchPosts: () => Promise<void>;
    createPost: (post: Omit<Post, 'id' | 'createdAt'>) => Promise<void>;
    updatePost: (id: number, updatedPost: Partial<Post>) => Promise<void>;
    deletePost: (id: number) => Promise<void>;
    error: string | null;
    loading: boolean;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const apiUrl = 'http://localhost:5000/posts';

    // Fetch all posts
    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Post[]>(apiUrl);
            setPosts(response.data);
        } catch (err) {
            setPosts([]);
            setError('Failed to fetch posts. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const createPost = async (post: Omit<Post, 'id' | 'createdAt'>) => {
        setLoading(true);
        setError(null);
        try {
            if (!post.content || post.content.trim() === '') {
                throw new Error('Post content cannot be empty.');
            }
            const response = await axios.post<Post>(apiUrl, post);
            setPosts((prevPosts) => [...prevPosts, response.data]);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Update an existing post
    const updatePost = async (id: number, updatedPost: Partial<Post>) => {
        setLoading(true);
        setError(null);
        try {
            if (updatedPost.content && updatedPost.content.trim() === '') {
                throw new Error('Post content cannot be empty.');
            }
            const response = await axios.put<Post>(`${apiUrl}/${id}`, updatedPost);
            setPosts((prevPosts) => prevPosts.map((post) => (post.id === id ? { ...post, ...response.data } : post)));
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Delete a post
    const deletePost = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${apiUrl}/${id}`);
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to delete post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PostContext.Provider
            value={{
                posts,
                fetchPosts,
                createPost,
                updatePost,
                deletePost,
                error,
                loading
            }}>
            {children}
        </PostContext.Provider>
    );
};

// Custom hook to use the PostContext
export const usePostContext = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePostContext must be used within a PostProvider');
    }
    return context;
};
