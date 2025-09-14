import PostFragment from "@/components/PostFragment";
import samplePosts from "@/lib/constants/sample-posts.json";
import {notFound} from "next/navigation";


interface PageProps {
    params: Promise<{ postId: string }>
}

async function PostItemPage({params}: PageProps) {
    const postId = (await params).postId;

    const post = samplePosts.find((post) => post.id === postId);

    if (!post) {
        notFound();
    }

    return (
        <div className='box page'>
            <p>{`Intercepted PostItemPage ${postId}`}</p>
            <PostFragment post={post}/>
        </div>
    );
}

export default PostItemPage;