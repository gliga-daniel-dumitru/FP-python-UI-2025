'use client';

import React from 'react';

import { usePosts } from '@/app/providers/PostProvider';
import { Post } from '@/app/types';

import CommentsModal from '../common/CommentsModal';
import DeleteModal from '../common/DeleteModal';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const { updatePost, deletePost } = usePosts();
    const [tempPostContent, setTempPostContent] = React.useState<string>(post.content);
    const [showComments, setShowComments] = React.useState(false);

    const [confirmDelete, setConfirmDelete] = React.useState(false);
    const [showEdit, setShowEdit] = React.useState(false);

    const handleOnEdit = () => {
        setShowEdit(false);
        if (tempPostContent !== post.content) {
            updatePost(post.id, { content: tempPostContent });
        }
    };

    const handleOnConfirmDelete = () => {
        setConfirmDelete(false);
        deletePost(post.id);
    };

    const handleOnLike = () => {
        if (post.likes) {
            updatePost(post.id, { likes: post.likes + 1 });
        } else {
            updatePost(post.id, { likes: 1 });
        }
    };

    return (
        <>
            <div className='light-bg-white_dark_bg-neutral-800 rounded-lg p-6 shadow-sm'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                        <span className='font-medium text-gray-600 dark:text-white'>anonymous</span>
                        {post?.detectedEmotion && (
                            <div className='lightb-g-gray-100_dark_bg-neutral-700 flex items-center space-x-1 rounded-full px-2 py-1'>
                                <i className={`ri-emotion-happy-line lightb-text-gray-100_dark_text-neutral-700`}></i>
                                <span className='text-xs text-gray-600 capitalize dark:text-white'>
                                    {post.detectedEmotion}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className='mt-2 flex items-center space-x-2'>
                        <button
                            onClick={() => setShowEdit(true)}
                            className='cursor-pointer text-sm text-blue-600 hover:text-blue-800'>
                            <i className='ri-edit-line'></i> Edit
                        </button>
                        <button
                            onClick={() => setConfirmDelete(true)}
                            className='cursor-pointer text-sm text-red-600 hover:text-red-800'>
                            <i className='ri-delete-bin-line'></i> Delete
                        </button>
                    </div>
                </div>
                <span className='text-sm text-gray-400 dark:text-gray-200'>
                    {formatDistanceToNow(new Date(post.createdAt))}
                </span>
                {showEdit ? (
                    <div className='my-4'>
                        <textarea
                            value={tempPostContent}
                            onChange={(e) => setTempPostContent(e.target.value)}
                            className='post-input mb-4 w-full resize-none rounded-lg p-6 text-base text-gray-700 placeholder-gray-400 shadow-sm dark:text-white'
                            placeholder="What's on your mind?"
                        />

                        <div className='flex gap-1'>
                            <button
                                onClick={handleOnEdit}
                                className='cursor-pointer rounded-lg bg-purple-600 px-6 py-2 text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-500'>
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setShowEdit(false);
                                    setTempPostContent(post.content);
                                }}
                                className='light-bg-white_dark-bg-neutral-800 light-text-gray-900_dark-text-gray-100 mt-3 inline-flex w-full cursor-pointer justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto dark:ring-gray-700 dark:hover:bg-neutral-700'>
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='my-4'>
                        <p className='break-words text-gray-700 dark:text-white'>{post.content}</p>
                    </div>
                )}

                <div className='mb-4 flex items-center space-x-6'>
                    <button
                        onClick={handleOnLike}
                        className='hover:text-primary flex cursor-pointer items-center space-x-2 text-gray-500 dark:text-white'>
                        <i className={`ri-heart-${post.likes ? 'fill text-primary' : 'line'} text-xl`}></i>
                        <span>{post.likes}</span>
                    </button>
                    <button
                        onClick={() => setShowComments(!showComments)}
                        className='hover:text-primary flex cursor-pointer items-center space-x-2 text-gray-500 dark:text-white'>
                        <i className='ri-chat-1-line text-xl'></i>
                        <span>{post?.comments?.length ?? 0}</span>
                    </button>
                </div>
            </div>
            <DeleteModal open={confirmDelete} setOpen={setConfirmDelete} onDelete={handleOnConfirmDelete} />
            <CommentsModal open={showComments} setOpen={setShowComments} comments={post.comments ?? []} />
        </>
    );
};

export default PostCard;
