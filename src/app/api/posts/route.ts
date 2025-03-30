import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/app/db';

export async function GET() {
    try {
        const posts = await db.post.findMany({});

        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const post = await db.post.create({
            data: {
                content: body.content,
                createdAt: new Date(),
                updatedAt: new Date(),
                likes: 0
            }
        });
        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
