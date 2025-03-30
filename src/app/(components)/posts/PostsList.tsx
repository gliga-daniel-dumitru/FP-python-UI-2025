'use client';

import React, { useEffect } from 'react';

import { usePosts } from '@/app/providers/PostProvider';

import PostCard from './PostCard';
import PostCardSkeleton from './PostCardSkeleton';

const PostsList = () => {
    const { loading, error, posts, fetchPosts } = usePosts();

    useEffect(() => {
        void fetchPosts();
    }, []);

    if (loading || !posts) {
        return (
            <>
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
            </>
        );
    }

    if (error) {
        return <div className='text-center text-red-500'>{error}</div>;
    }

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
