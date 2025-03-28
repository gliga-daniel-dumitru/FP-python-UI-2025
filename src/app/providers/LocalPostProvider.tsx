'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { NotificationType, useNotification } from '../(components)/hooks/useNotification';
import { Post } from '../types';

interface LocalPostContextProps {
    posts: Post[];
    fetchPosts: () => void;
    createPost: (postContent: string) => void;
    updatePost: (id: number, updatedPost: Partial<Post>) => void;
    deletePost: (id: number) => void;
    showNotification: (type: NotificationType, message: string) => void;
}

const LocalPostContext = createContext<LocalPostContextProps | undefined>(undefined);

export const LocalPostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { Notification, showNotification } = useNotification();

    const [posts, setPosts] = useState<Post[]>([]);

    const localStorageKey = 'posts';

    // Fetch all posts from localStorage
    const fetchPosts = () => {
        const storedPosts = localStorage.getItem(localStorageKey);
        if (storedPosts) {
            setPosts(JSON.parse(storedPosts));
        } else {
            setPosts([]);
        }
    };

    // Save posts to localStorage
    const saveLocalPostsToLocalStorage = (posts: Post[]) => {
        localStorage.setItem(localStorageKey, JSON.stringify(posts));
    };

    // Create a new post
    const createPost = (postContent: string) => {
        try {
            const newPost: Post = {
                id: Date.now(), // Use createdAt as a unique ID
                createdAt: new Date().toISOString(),
                content: postContent,
                likes: 0,
                comments: null,
                detectedEmotion: '' // Placeholder for detected emotion
            };

            const updatedPosts = [newPost, ...posts];
            setPosts(updatedPosts);
            saveLocalPostsToLocalStorage(updatedPosts);
            showNotification('success', 'Post created successfully!');
        } catch (error) {
            console.error('Error creating post:', error);
            showNotification('error', 'Failed to create post');
        }
    };

    // Update an existing post
    const updatePost = (id: number, updatedPost: Partial<Post>) => {
        try {
            const updatedPosts = posts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post));
            setPosts(updatedPosts);
            saveLocalPostsToLocalStorage(updatedPosts);
            showNotification('success', 'Post updated successfully!');
        } catch (error) {
            console.error('Error updating post:', error);
            showNotification('error', 'Failed to update post');
        }
    };

    // Delete a post
    const deletePost = (id: number) => {
        try {
            const updatedPosts = posts.filter((post) => post.id !== id);
            setPosts(updatedPosts);
            saveLocalPostsToLocalStorage(updatedPosts);
            showNotification('success', 'Post deleted successfully!');
        } catch (error) {
            console.error('Error deleting post:', error);
            showNotification('error', 'Failed to delete post');
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <LocalPostContext.Provider
            value={{
                posts,
                fetchPosts,
                createPost,
                updatePost,
                deletePost,
                showNotification
            }}>
            <>
                {children}
                <Notification />
            </>
        </LocalPostContext.Provider>
    );
};

// Custom hook to use the LocalPostContext
export const useLocalPostContext = () => {
    const context = useContext(LocalPostContext);
    if (!context) {
        throw new Error('useLocalPostContext must be used within a LocalPostProvider');
    }
    return context;
};
