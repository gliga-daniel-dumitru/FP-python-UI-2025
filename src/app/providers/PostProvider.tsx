'use client';

import React, { createContext, useContext, useState } from 'react';

import { NotificationType, useNotification } from '../(components)/hooks/useNotification';
import { Post } from '../types';
import axios from 'axios';

interface PostContextProps {
    posts: Post[] | null;
    fetchPosts: () => Promise<void>;
    createPost: (content: string) => Promise<void>;
    updatePost: (id: string, updatedPost: Pick<Post, 'content'>) => Promise<void>;
    deletePost: (id: string) => Promise<void>;
    error: string | null;
    loading: boolean;
    showNotification: (type: NotificationType, message: string) => void;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { Notification, showNotification } = useNotification();
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const apiUrl = 'http://localhost:3000/api/posts';

    // Fetch all posts
    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Post[]>(apiUrl);
            setPosts(response.data);
            showNotification('success', 'Posts fetched successfully!');
        } catch (err) {
            setPosts([]);
            setError('Failed to fetch posts. Please try again later.');
            showNotification('error', 'Failed to fetch posts. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const createPost = async (content: string) => {
        setError(null);
        try {
            if (!content || content.trim() === '') {
                throw new Error('Post content cannot be empty.');
            }

            const response = await axios.post<Post>(apiUrl, { content });
            setPosts((prevPosts) => [response.data, ...(prevPosts || [])]);
            showNotification('success', 'Post created successfully!');
        } catch (err: any) {
            const message = err.response?.data?.message || 'Failed to create post. Please try again.';
            setError(message);
            showNotification('error', message);
        }
    };

    // Update an existing post
    const updatePost = async (id: string, updatedPost: Pick<Post, 'content'>) => {
        setError(null);
        try {
            if (updatedPost.content && updatedPost.content.trim() === '') {
                throw new Error('Post content cannot be empty.');
            }
            const response = await axios.patch<Post>(`${apiUrl}/${id}`, updatedPost);
            setPosts((prevPosts) =>
                (prevPosts || []).map((post) => (post.id === id ? { ...post, ...response.data } : post))
            );
            showNotification('success', 'Post updated successfully!');
        } catch (err: any) {
            const message = err.response?.data?.message || 'Failed to update post. Please try again.';
            setError(message);
            showNotification('error', message);
        }
    };

    // Delete a post
    const deletePost = async (id: string) => {
        setError(null);
        try {
            await axios.delete(`${apiUrl}/${id}`);
            setPosts((prevPosts) => (prevPosts || []).filter((post) => post.id !== id));
            showNotification('success', 'Post deleted successfully!');
        } catch (err: any) {
            const message = err.response?.data?.message || 'Failed to delete post. Please try again.';
            setError(message);
            showNotification('error', message);
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
                showNotification,
                error,
                loading
            }}>
            <>
                {children}
                <Notification />
            </>
        </PostContext.Provider>
    );
};

// Custom hook to use the PostContext
export const usePosts = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePosts must be used within a PostProvider');
    }
    return context;
};
