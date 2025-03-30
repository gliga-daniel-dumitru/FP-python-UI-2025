export interface Post {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    likes: number;
    comments?: Comment[] | null;
    detectedEmotion?: string;
}

export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    postId: string;
    post?: Post;
}
