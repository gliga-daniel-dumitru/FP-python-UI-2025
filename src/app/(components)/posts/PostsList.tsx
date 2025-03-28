'use client';

import React, { useEffect } from 'react';

import { useLocalPostContext } from '@/app/providers/LocalPostProvider';
import { usePostContext } from '@/app/providers/PostProvider';

import { useNotification } from '../hooks/useNotification';
import PostCard from './PostCard';

const PostsList = () => {
    const { posts, fetchPosts, showNotification } = useLocalPostContext();

    useEffect(() => {
        void fetchPosts();
    }, []);

    // if (loading) {
    //     return <div className='text-center'>Loading...</div>;
    // }

    // if (error) {
    //     return <div className='text-center text-red-500'>{error}</div>;
    // }

    return (
        <>
            {posts.length === 0 && (
                <div className='text-center text-gray-500'>No posts available. Please create a post.</div>
            )}
            {(posts || []).map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </>
    );
};

export default PostsList;
