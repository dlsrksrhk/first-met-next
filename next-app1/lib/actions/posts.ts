'use server';

import samplePosts from '@/lib/constants/sample-posts.json';

export async function readPostsAction(): Promise<MyNextApp.Post[]> {
    return new Promise((resolve) => {
        resolve(samplePosts);
    });
}
