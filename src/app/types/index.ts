export interface Post {
    id: number;
    content: string;
    createdAt: string;
    likes: number;
    comments?: Comment[] | null;
    detectedEmotion?: string;
}

export interface Comment {
    id: number;
    content: string;
    createdAt: string;
}
