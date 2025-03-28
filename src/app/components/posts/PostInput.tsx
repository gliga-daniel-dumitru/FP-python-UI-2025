'use client';

import { useState } from 'react';

const PostInput = () => {
    const [postContent, setPostContent] = useState('');
    const [charCount, setCharCount] = useState(0);
    const [error, setError] = useState('');

    const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setError(value.length > 300 ? 'Character limit exceeded' : '');
        setPostContent(value);
        setCharCount(value.length);
    };

    const handlePostSubmit = () => {
        if (postContent.trim()) {
            setPostContent('');
            setCharCount(0);
        }
    };

    return (
        <div className='mb-8 rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-800'>
            <textarea
                value={postContent}
                onChange={handlePostChange}
                className='post-input mb-4 h-32 w-full resize-none rounded-lg p-6 text-base text-gray-700 placeholder-gray-400 shadow-sm dark:text-white'
                placeholder="What's on your mind?"
            />

            <div className='flex items-center justify-between'>
                <div className='flex gap-1'>
                    <span className={`text-sm text-gray-500 ${error && 'text-red-700'}`}>{charCount}/300</span>
                    <span className={`text-sm ${error ? 'text-red-700' : 'hidden'}`}>{error}</span>
                </div>
                <button
                    onClick={handlePostSubmit}
                    disabled={!!error || charCount === 0}
                    className='cursor-pointer rounded-lg bg-purple-600 px-6 py-2 text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-500'>
                    Post
                </button>
            </div>
        </div>
    );
};

export default PostInput;
