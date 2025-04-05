'use client';

import { useState } from 'react';

import { Comment } from '@/app/types';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function CommentsModal({
    open,
    setOpen,
    comments
}: {
    comments: Comment[] | null;
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    return (
        <Dialog open={open} onClose={setOpen} className='relative z-90'>
            <DialogBackdrop className='fixed inset-0 bg-gray-500/75 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in' />

            <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                    <DialogPanel className='light-bg-white_dark-bg-neutral-800 relative transform overflow-hidden rounded-lg text-left shadow-xl data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95'>
                        <div className='light-bg-white_dark-bg-neutral-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                            <div className='sm:flex sm:items-start'>
                                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                    <DialogTitle
                                        as='h3'
                                        className='light-text-gray-900_dark-text-gray-100 text-base font-semibold'>
                                        Comments
                                    </DialogTitle>
                                </div>
                            </div>
                        </div>
                        <div className='light-bg-gray-50_dark-bg-neutral-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                            <button
                                type='button'
                                data-autofocus
                                onClick={() => setOpen(false)}
                                className='light-bg-white_dark-bg-neutral-800 light-text-gray-900_dark-text-gray-100 mt-3 inline-flex w-full cursor-pointer justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto dark:ring-gray-700 dark:hover:bg-neutral-700'>
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}
